import { defineConfig } from '@adonisjs/auth'
import { basicAuthGuard, basicAuthUserProvider } from '@adonisjs/auth/basic_auth'
import type { InferAuthenticators, InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'

const authConfig = defineConfig({
  default: 'api',   // mettere la guard token come default (opzionale)
  guards: {
    basicAuth: basicAuthGuard({
      provider: basicAuthUserProvider({
        model: () => import('#models/user'),
      }),
    }),

    api: tokensGuard({
      provider: tokensUserProvider({
        model: () => import('#models/user'),
        tokens: 'accessTokens' // nome statico che usi nel tuo model, se serve
      }),
      // puoi passare opzioni come tokenProvider, expiresIn etc qui se vuoi
    }),
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  export interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}