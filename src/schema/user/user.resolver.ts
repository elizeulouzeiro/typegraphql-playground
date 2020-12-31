import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {
  Arg,
  Mutation,
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
} from 'type-graphql'

import configs from '@/configs'
import { AppContext } from '@/interfaces/AppContext.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

import { LoginInput } from './input-types/LoginInput'
import { RegisterInput } from './input-types/RegisterInput'
import { LoginResponse } from './object-types/LoginResponse'
import { User, UserModel } from './user.type'

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  @UseMiddleware(AuthMiddleware)
  async Me(@Ctx() { payload }: AppContext): Promise<User> {
    const { id } = payload

    return await UserModel.findById(id)
  }

  @Mutation(() => User)
  async Register(
    @Arg('data') { name, document, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await hash(password, 10)

    const user = new UserModel({
      name,
      document,
      password: hashedPassword,
      creationDate: new Date(),
    })

    await user.save()

    return user
  }

  @Mutation(() => LoginResponse)
  async Login(@Arg('login') { document, password }: LoginInput) {
    const user = await UserModel.findOne({ document })

    if (!user) {
      throw new Error('Could not find user')
    }

    const verify = await compare(password, user.password)

    if (!verify) {
      throw new Error('Bad password')
    }

    return {
      token: sign({ id: user.id }, configs.JWTSecret, { expiresIn: '60m' }),
    }
  }
}

export { UserResolver }
