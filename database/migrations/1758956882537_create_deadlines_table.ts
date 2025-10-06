import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'deadlines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('title').notNullable().defaultTo('no_title')
      table.text('description').nullable()
      table.timestamp('deadline', { useTz: true }) // Scadenza
      table.timestamp('remind_at', { useTz: true }) // Promemoria
      table.enum('status', ['sospeso', 'completato', 'scaduto']).defaultTo('sospeso') // ATTESA - COMPLETATO - SCADUTO
      table.enum('repeat', ['giornaliero', 'settimanale', 'mensile', 'annuale']).nullable()// daily, weekly, monthly, yearly

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
