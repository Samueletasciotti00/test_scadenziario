import type { HttpContext } from '@adonisjs/core/http'
import Deadline from '#models/deadline'
import { DateTime } from 'luxon'
import { createDeadlineValidator, updateDeadlineValidator } from '#validators/deadline'
export default class DeadlinesController {
  public async index({ response }: HttpContext) {
    const deadlines = await Deadline.query().preload('user')
    return response.ok(deadlines)
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createDeadlineValidator)
    const deadline = await Deadline.create({
      title: data.title,
      description: data.description,
      dueAt: DateTime.fromJSDate(data.due_at), // converto da Date JS a Luxon
      remindAt: data.remind_at ? DateTime.fromJSDate(data.remind_at) : null,
      status: data.status,
      repeat: data.repeat,
      userId: data.user_id,
    })
    await deadline.load('user')
    return response.created(deadline)
  }
  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const deadline = await Deadline.query().where('id', params.id).firstOrFail()

      return response.ok(deadline)
    } catch (error) {
      return response.status(404).json({ error: 'Deadline non trovata' })
    }
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const deadline = await Deadline.findOrFail(params.id)

      const data = request.only([
        'title',
        'description',
        'dueAt',
        'remindAt',
        'status',
        'repeat',
        'userId',
      ])

      deadline.merge(data)
      await deadline.save()
      await deadline.load('user')

      return response.ok(deadline)
    } catch (error) {
      return response.status(404).json({
        error: 'Deadline non trovata o aggiornamento fallito',
        message: error.message,
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const deadline = await Deadline.findOrFail(params.id)
      await deadline.delete()

      return response.status(200).json({
        message: 'Deadline eliminata con successo',
      })
    } catch (error) {
      return response.status(404).json({
        error: 'Deadline non trovata o eliminazione fallita',
      })
    }
  }
}
