import { ObjectId } from 'mongodb'
import * as path from 'path'
import { buildSchema, BuildSchemaOptions } from 'type-graphql'

import { TypegooseMiddleware } from '@/middlewares/typegoose.middleware'
import { ObjectIdScalar } from '@/utils/ObjectId.scalar'

import { UserResolver } from './user/user.resolver'

const createSchema = async () => {
  try {
    const schema: BuildSchemaOptions = {
      resolvers: [UserResolver],
      emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
      globalMiddlewares: [TypegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: false,
    }

    return buildSchema(schema)
  } catch (err) {
    console.log({ err })
  }
}

export { createSchema }
