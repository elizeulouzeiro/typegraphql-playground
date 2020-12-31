import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

import configs from '@/configs'

async function main() {
  const app = express()

  app.listen(configs.ServerPort, () =>
    console.log(`🚀 Server ready on port ${configs.ServerPort}!`)
  )
}

main()
