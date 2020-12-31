export default {
  ConnectionString: process.env.MONGO_ATLAS_CONNECTION_STRING,
  JWTSecret: process.env.APP_SECRET_KEY,
  ServerPort: process.env.EXPRESS_PORT,
}
