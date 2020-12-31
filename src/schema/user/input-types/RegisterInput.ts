import { Length, MaxLength, MinLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class RegisterInput {
  @Field()
  @MaxLength(100)
  name: string

  @Field()
  @Length(11)
  document: string

  @Field()
  @MinLength(4)
  password: string
}

export { RegisterInput }
