import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      // Define validation schema
      const schema = vine.object({
        name: vine.string().minLength(3),
        email: vine.string().email().unique({
          table: 'users',
          column: 'email',
        }),
        password: vine.string().minLength(6),
      })
      // Data validation
      const data = await vine.validate({ schema, data: request.body() })
      // Create user
      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: DateTime.now(),
      })

      await user.load('deadlines')
    } catch (error) {
      return response.status(400).json({
        error: "Impossibile creare l'utente, controllare i dati quali(email / password)",
        message: error.message,
      })
    }
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
      const data = request.only(['name', 'email', 'password'])

      user.merge(data)
      await user.save()

      return response.ok(user)
    } catch (error) {
      return response.status(400).json({
        error: "Impossibile aggiornare l'utente \ o non trovato",
        message: error.message,
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
