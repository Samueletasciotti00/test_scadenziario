import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  // Register a new user
  public async register({ request, response }: HttpContext) {
    // Implementation for user registration
    const data = await request.validateUsing(createUserValidator)
    // Create user from validated data
    const user = await User.create(data)
    await user.load('deadlines')

    return response.created({
      message: 'Utente creato con successo',
      user,
    })
  }

  // Login user
  public async login({ request, response }: HttpContext) {
    // Estrai email e password dalla request
    const { email, password } = request.only(['email', 'password'])

    // Trova l'utente tramite email
    const user = await User.findBy('email', email)

    // Se l'utente non esiste, ritorna errore
    if (!user) {
      return response.unauthorized({
        message: 'Credenziali non valide',
      })
    }

    // Verifica la password usando hash.verify
    const isPasswordValid = await hash.verify(user.password, password)

    // Se la password non è corretta, ritorna errore
    if (!isPasswordValid) {
      return response.unauthorized({
        message: 'Credenziali non valide',
      })
    }

    // Se tutto è corretto, genera un token di accesso
    const token = await User.accessTokens.create(user)

    return response.ok({
      message: 'Login effettuato con successo',
      token: token.value!.release(),
      user,
    })
  }

  // Logout user
  public async logout({ auth, response }: HttpContext) {
    await auth.use('api').authenticate()

    // Ottengo il token corrente
    const token = (auth.use('api') as any).token

    if (token) {
      await token.delete() // Revoca solo il token usato in questa sessione
    }

    return response.ok({
      message: 'Logout effettuato con successo',
    })
  }
}
