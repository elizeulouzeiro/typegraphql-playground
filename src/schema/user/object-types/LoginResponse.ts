import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class LoginResponse {
  @Field()
  token: string
}

export { LoginResponse }
