import router from '@adonisjs/core/services/router'
import DeadlinesController from '../app/controllers/DeadlinesController.js'
import UsersController from '../app/controllers/UsersController.js'

router.get('/', async () => {
  return {'status': 'ok' }
})

router.resource('deadlines', DeadlinesController).apiOnly()
router.resource('users', UsersController).apiOnly()
