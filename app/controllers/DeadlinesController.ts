import type { HttpContext } from '@adonisjs/core/http'
import Deadline from '#models/deadline'
import { DateTime } from 'luxon'
import { createDeadlineValidator, updateDeadlineValidator } from '#validators/deadline'
export default class DeadlinesController {
  public async index({ response }: HttpContext) {
    const deadlines = await Deadline.query().preload('user')
    return response.ok(deadlines)
  }

  public async store({ request, response, auth }: HttpContext) {
    const user = auth.user!
    const data = await request.validateUsing(createDeadlineValidator)
    const deadline = await Deadline.create({
      title: data.title,
      description: data.description,
      deadline: DateTime.fromJSDate(data.deadline),
      remindAt: data.remind_at ? DateTime.fromJSDate(data.remind_at) : null,
      status: data.status,
      repeat: data.repeat,
      userId: user.id,
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
    // Validate incoming request data
    const data = await request.validateUsing(updateDeadlineValidator)
    const deadline = await Deadline.findOrFail(params.id)
    // Merge the new data into the existing deadline instance
    deadline.merge({
      title: data.title ?? deadline.title,
      description: data.description ?? deadline.description,
      deadline: data.deadline ? DateTime.fromJSDate(data.deadline) : deadline.deadline,
      remindAt: data.remind_at ? DateTime.fromJSDate(data.remind_at) : deadline.remindAt,
      status: data.status ?? deadline.status,
      repeat: data.repeat ?? deadline.repeat,
      userId: data.user_id ?? deadline.userId,
    })

    // Save the updated deadline to the database
    await deadline.save()
    await deadline.load('user')
    // Return the updated deadline
    return response.ok(deadline)
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
  // Assegnare una scadenza a un utente specifico
  public async taken({ params, auth, response }: HttpContext) {
    // Verifico l'utente loggato
    const user = auth.user!
    // Trovo la scadenza specifica
    const deadline = await Deadline.findOrFail(params.id)
    if (!deadline) {
      return response.status(404).json({ error: 'Deadline non trovata' })
    }

    if (deadline.takenByUserId) {
      return response.status(400).json({ error: 'Deadline già assegnata ad un altro utente' })

    } else if (deadline.takenByUserId === user.id) {
      return response.status(400).json({ error: 'Hai già preso in carico questa deadline' })
      
    } else {
      // Assegno la scadenza all'utente loggato
      deadline.takenByUserId = user!.id
      await deadline.save()

      return response.ok({
        message: ' Scadenza assegnata con successo',
        deadline,
      })
    }
  }

  // Aggiornare lo status di una deadline
  public async updateStatus({ request, response }: HttpContext) {
    const { id } = request.params()
    const { status } = request.body()

    // Trovo la deadline
    const deadline = await Deadline.find(id)
    if (!deadline) {
      return response.status(404).json({ error: 'Deadline non trovata' })
    }

    // Aggiorno lo status
    deadline.status = status
    await deadline.save()
    return response.json({ message: 'Status aggiornato con successo', deadline })
  }
}
