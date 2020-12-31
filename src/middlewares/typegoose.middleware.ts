import { getClassForDocument } from '@typegoose/typegoose'
import { Document, Model } from 'mongoose'
import { MiddlewareFn } from 'type-graphql'

const convertDocument = (document: Document) => {
  const convertedDocument = document.toObject()
  const DocumentClass = getClassForDocument(document)

  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype)

  return convertedDocument
}

const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const convertModel = item =>
    item instanceof Model ? convertDocument(item) : item

  const result = await next()

  if (Array.isArray(result)) return result.map(convertModel)

  if (result instanceof Model) return convertModel(result)

  return result
}

export { TypegooseMiddleware }
