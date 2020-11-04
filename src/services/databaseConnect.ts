import { Client } from 'pg'
import config from '../config'

const postgresServer: string = config.database.postgres.server || ''

export default function (callback: (client: Client) => void): void{
    const client = new Client({ host: postgresServer, password: 'notad123', user: 'postgres', database: 'postgres' })

    client.connect()
    callback(client)
}
