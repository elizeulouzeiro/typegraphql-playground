import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import {
  Arg,
  Mutation,
  Resolver,
  Query,
  Ctx,
  Field,
  ObjectType,
  UseMiddleware,
} from 'type-graphql'

import configs from '@/configs'
import { AppContext } from '@/interfaces/AppContext.interface'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

import { User, UserModel } from './user.type'

@ObjectType()
class LoginResponse {
  @Field()
  token: string
}

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
    @Arg('name') name: string,
    @Arg('document') document: string,
    @Arg('password') password: string
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
  async Login(
    @Arg('document') document: string,
    @Arg('password') password: string
  ) {
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
