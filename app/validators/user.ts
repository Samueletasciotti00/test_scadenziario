import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        email: vine.string().email().unique({
            table: 'users',
            column: 'email',
        }),
        password: vine.string().minLength(6),
    })
)

export const updateUserValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(3).optional(),
        email: vine.string().email().optional(),
        password: vine.string().minLength(6).optional(),
    })
)