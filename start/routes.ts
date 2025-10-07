import router from '@adonisjs/core/services/router'
import DeadlinesController from '../app/controllers/DeadlinesController.js'
import UsersController from '../app/controllers/UsersController.js'
import AuthController from '../app/controllers/auth_controller.js'

// Import middleware
import { middleware } from './kernel.js'

// Rotta di test
router.get('/', async () => {
  return { status: 'ok' }
})

// Rotte aggiuntive per utenti loggati
router
  .group(() => {
    router.get('/deadlines', [DeadlinesController, 'index'])
    router.post('/deadlines', [DeadlinesController, 'store'])
    router.put('/deadlines/:id', [DeadlinesController, 'update'])
    router.delete('/deadlines/:id', [DeadlinesController, 'destroy'])
  })
  .use([middleware.auth(), middleware.isAdmin()])
  
router.post('/deadlines/:id/take', [DeadlinesController, 'taken']).use([middleware.auth()])
// Rotta per aggiornare solo lo stato della deadline da utente loggato
router.patch('/deadlines/:id/status', [DeadlinesController, 'updateStatus']).use([middleware.auth(), middleware.checkDeadlineOwnership()])

// Rotte CRUD per users (Manuale)
router.resource('users', UsersController).apiOnly()

// Auth routes
router.post('/register', async (ctx) => {
  return new AuthController().register(ctx)
})
router.post('/login', async (ctx) => {
  return new AuthController().login(ctx)
})
router.post('/logout', async (ctx) => {
  return new AuthController().logout(ctx)
})
