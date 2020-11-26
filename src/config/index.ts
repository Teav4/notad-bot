import tichhop247 from '@/webhook/tichhop247'
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
    pageID: '105995037415271',
    access_token: process.env.PAGE_ACCESS_TOKEN
  },
  tichhop247_key: process.env.TICHHOP247_APIKEY,
  tichhop247_card_rate: {
    default: 0.25
  },
  tichhop247_network_list: ['VTT', 'VMS', 'VNP', 'VNM'],
  tichhop247_card_type: [10000, 20000, 30000, 50000, 100000, 200000, 300000, 500000, 1000000]
}
