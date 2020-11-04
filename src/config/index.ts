import dotenv from 'dotenv'

dotenv.config()

export default {
  database: {
    postgres: {
      server: process.env.POSTGRES_SERVER,
      password: process.env.notad123,
      database_name: process.env.POSTGRES_DATABASE_NAME,
    }
  },
  page: {
    access_token: process.env.PAGE_ACCESS_TOKEN
  },
  tichhop247_key: process.env.TICHHOP247_APIKEY
}
