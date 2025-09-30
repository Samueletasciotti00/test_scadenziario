import type { HttpContext } from '@adonisjs/core/http'
import Deadline from '#models/deadline'
import { DateTime } from 'luxon'

export default class DeadlinesController {
  /**
   * GET /deadlines
   * Ritorna tutte le deadline
   */
  public async index({ response }: HttpContext) {
    const deadlines = await Deadline.all()
    return response.ok(deadlines)
  }

  /**
   * POST /deadlines
   * Crea una nuova deadline
   */
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only([
        'title',
        'description',
        'due_at',
        'remind_at',
        'status',
        'repeat',
        'user_id',
      ])

      const deadline = await Deadline.create({
        title: data.title,
        description: data.description,
        dueAt: DateTime.fromISO(data.due_at),
        remindAt: data.remind_at ? DateTime.fromISO(data.remind_at) : null,
        status: data.status,
        repeat: data.repeat,
        userId: parseInt(data.user_id),
      })

      await deadline.load('user')

      return response.status(201).json(deadline)
    } catch (error) {
      return response.status(400).json({
        error: 'Impossibile creare la deadline',
        message: error.message,
      })
    }
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
