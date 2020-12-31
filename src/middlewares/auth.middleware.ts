import { verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'

import configs from '@/configs'
import { AppContext } from '@/interfaces/AppContext.interface'

const AuthMiddleware: MiddlewareFn<AppContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization

  if (!authorization) throw new Error('not authenticated')

  try {
    const [, token] = authorization.split(' ')
    const payload = verify(token, configs.JWTSecret)

    context.payload = payload as any
  } catch (err) {
    console.log({ err })
  }

  return next()
}

export { AuthMiddleware }
