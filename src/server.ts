import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

import configs from '@/configs' // eslint-disable-line import/first
import { createSchema } from '@/schema' // eslint-disable-line import/first

async function main() {
  const app = express()

  mongoose
    .connect(configs.ConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`🚀 Database connected!`))
    .catch(err => console.log("❌ Couldn't connect to database", { err }))

  const server = new ApolloServer({
    playground: true,
    schema: await createSchema(),
    context: ({ req, res }) => ({ req, res }),
  })

  server.applyMiddleware({ app })

  app.listen(configs.ServerPort, () =>
    console.log(`🚀 Server ready on port ${configs.ServerPort}!`)
  )
}

main()
