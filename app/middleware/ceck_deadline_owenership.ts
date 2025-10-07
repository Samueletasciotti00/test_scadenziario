import { HttpContext } from '@adonisjs/core/http'
import Deadline from '#models/deadline'

export default class ceckDeadlineOnwnership{
    public async handle({ auth, params, response }: HttpContext, next: () => Promise<void>) {
        const deadline = await Deadline.find(params.id)
        // Controllo se esiste questa deadline
        if(!deadline){
            return response.status(404).json({ error: 'Deadline non trovata' })
        }

        if (deadline.takenByUserId !== auth.user?.id){
            return response.status(403).json({ error: 'Non hai i permessi per modificare questa deadline' })
        }
        
        await next()
    }
}