import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'

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
      const data = request.only(['name', 'email', 'password'])

      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: DateTime.now(),
      })

      await user.load('deadlines')
    } catch (error) {
      return response.status(400).json({
        error: "Impossibile creare l'utente",
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
