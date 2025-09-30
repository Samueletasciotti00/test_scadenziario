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
    } catch (error) {
      return response.status(400).json({
        error: 'Impossibile creare l\'utente',
        message: error.message,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {}
}