import mysql from 'mysql'

const connection = mysql.createConnection({
    host: '103.82.24.211',
    user: 'root',
    password: 'Notad123',
    database: 'botdata',
})

connection.connect()

export default function databaseConnect(callback: (connection: mysql.Connection) => void) {
    callback(connection)
}
