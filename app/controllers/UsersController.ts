import type { HttpContext } from '@adonisjs/core/http'
//import { DateTime } from 'luxon'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  async store({ request, response }: HttpContext) {

    // Validate incoming request data
    const data = await request.validateUsing(createUserValidator)
    // Create user from validated data
    const user = await User.create({
      ...data,
      role: ('user' || 'admin' ) ?? 'user', // Imposto il ruolo predefinito a 'user'
    })
    await user.load('deadlines')
    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.query().where('id', params.id).firstOrFail()
      return response.ok(user)
    } catch (error) {
      return response.status(404).json({
        error: 'Untente non trovato',
        message: error.message,
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      
      // Validazione automatica
      const data = await request.validateUsing(updateUserValidator)
      
      user.merge(data)
      await user.save()
      
      return response.ok(user)
    } catch (error) {
      return response.status(400).json({
        error: "Impossibile aggiornare l'utente o non trovato",
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      return response.status(200).json({
        message: 'Utente eliminato con successo',
      })
    } catch (error) {
      return response.status(400).json({
        error: "Impossibile eliminare l'utente o non trovato",
        message: error.message,
      })
    }
  }
}
