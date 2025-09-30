import router from '@adonisjs/core/services/router'
import DeadlinesController from '../app/controllers/DeadlinesController.js'


router.get('/', async () => {
  return {}
})

router.resource('deadlines', DeadlinesController).apiOnly()
