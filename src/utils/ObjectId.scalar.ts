import { ASTNode, GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  serialize: (value: ObjectId): string => value.toHexString(),
  parseValue: (value: string) => new ObjectId(value),
  parseLiteral: (ast: ASTNode) =>
    ast.kind === Kind.STRING ? new ObjectId(ast.value) : null,
})

export { ObjectIdScalar }
