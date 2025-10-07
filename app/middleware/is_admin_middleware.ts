import { HttpContext } from "@adonisjs/core/http"

export default class isAdminMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>) {
    const user = auth.user
    
    console.log('🔍 Controllo ruolo admin')
    console.log('👤 Utente:', user?.id)
    console.log('🎭 Ruolo:', user?.role)
    
    // A questo punto l'utente DEVE essere autenticato (grazie al middleware auth)
    if (!user) {
      console.log('❌ Nessun utente autenticato')
      return response.unauthorized({ message: 'Utente non autenticato' })
    }
    
    // Verifica il ruolo admin
    if (user.role.toLowerCase() !== 'admin') {
      console.log('❌ Utente non admin:', user.role)
      return response.forbidden({ 
        message: 'Accesso negato. Solo gli amministratori possono accedere a questa risorsa.' 
      })
    }
    
    console.log('✅ Utente admin verificato')
    await next()
  }
}