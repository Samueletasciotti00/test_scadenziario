import router from '@adonisjs/core/services/router'
import DeadlinesController from '../app/controllers/DeadlinesController.js'
import UsersController from '../app/controllers/UsersController.js'
import AuthController from '../app/controllers/auth_controller.js'


// Rotta di test
router.get('/', async () => { return {'status': 'ok' } })

// Rotte CRUD per deadlines e users (Manuale)
router.resource('deadlines', DeadlinesController).apiOnly()
router.resource('users', UsersController).apiOnly()

// Rotta per registrazione
router.post('/register', async (ctx) => {
  return new AuthController().register(ctx)
})

// Rotta per login  
router.post('/login', async (ctx) => {
  return new AuthController().login(ctx)
})

// Rotta per logout
router.post('/logout', async (ctx) => {
  return new AuthController().logout(ctx)
})
