import vine from '@vinejs/vine'

export const createDeadlineValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(1000).optional(),
    deadline: vine.date({
      formats: ['iso8601'],
    }),
    remind_at: vine
      .date({
        formats: ['iso8601'],
      })
      .optional(),
    status: vine.enum(['sospeso', 'completato', 'scaduto']),
    repeat: vine.enum(['giornaliero', 'settimanale', 'mensile', 'annuale']).optional(),
    user_id: vine.number().optional(),
  })
)

export const updateDeadlineValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255).optional(),
    description: vine.string().minLength(3).maxLength(1000).optional(),
    deadline: vine.date({
      formats: ['iso8601'],
    }),
    remind_at: vine.date().optional(),
    status: vine.enum(['sospeso', 'completato', 'scaduto']).optional(),
    repeat: vine.enum(['giornaliero', 'settimanale', 'mensile', 'annuale']).optional(),
    user_id: vine.number().optional(),
  })
)
