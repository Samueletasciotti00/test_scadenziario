import factory from '@adonisjs/lucid/factories'
import Deadline from '#models/deadline'

export const DeadlineFactory = factory
  .define(Deadline, async ({ faker }) => {
    return {}
  })
  .build()