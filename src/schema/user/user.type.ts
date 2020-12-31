import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { MaxLength, Length, MinLength } from 'class-validator'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Object that represent the user' })
class User {
  @Field()
  readonly _id: ObjectId

  @Field()
  @MaxLength(100)
  @Property({ required: true })
  name: string

  @Field()
  @Length(11)
  @Property({ required: true })
  document: string

  @Field()
  @MinLength(4)
  @Property()
  password: string

  @Field()
  @Property()
  creationDate: Date
}

const UserModel = getModelForClass(User)

export { User, UserModel }
