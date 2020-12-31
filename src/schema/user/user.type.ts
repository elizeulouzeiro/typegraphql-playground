import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Object that represent the user' })
class User {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  name: string

  @Field()
  @Property({ required: true })
  document: string

  @Field()
  @Property()
  password: string

  @Field()
  @Property()
  creationDate: Date
}

const UserModel = getModelForClass(User)

export { User, UserModel }
