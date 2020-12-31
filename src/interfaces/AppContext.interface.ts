import { Request, Response } from 'express'

interface AppContext {
  req: Request
  res: Response
  payload?: { id: string }
}

export { AppContext }
