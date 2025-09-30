// database/seeders/user_seeder.ts

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user' 

export default class extends BaseSeeder {
  async run() {
    await User.create({ 
      name: 'utente_prova',
      email: 'emaildiprova@prova.it', 
      password: 'password_di_prova', 
      role: 'ADMIN',
    })
  }
}