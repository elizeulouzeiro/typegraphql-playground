import { Length, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class LoginInput {
  @Field()
  @Length(11)
  document: string

  @Field()
  @MinLength(4)
  password: string
}

export { LoginInput }
