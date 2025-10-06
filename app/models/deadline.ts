import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

// Importing types for BelongsTo type checking
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

class Deadline extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column.dateTime()
  declare deadline: DateTime

  @column.dateTime()
  declare remindAt: DateTime | null

  @column()
  declare status: 'sospeso' | 'completato' | 'scaduto'

  @column()
  declare repeat: 'giornaliero' | 'settimanale' | 'mensile' | 'annuale' | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

export default Deadline
