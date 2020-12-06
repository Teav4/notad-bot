import mysql from 'mysql'
import config from '../config'

const connection = mysql.createConnection({
    host: config.database.mysql.server,
    user: config.database.mysql.username,
    password: config.database.mysql.password,
    database: config.database.mysql.database_name,
})

connection.connect()

export default function databaseConnect(callback: (connection: mysql.Connection) => void) {
    callback(connection)
}
