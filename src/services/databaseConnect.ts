import mysql from 'mysql'

const connection = mysql.createConnection({
    host: '45.76.163.134',
    user: 'root',
    password: 'new_password',
    database: 'gachthe',
})

connection.connect()

export default function databaseConnect(callback: (connection: mysql.Connection) => void) {
    callback(connection)
}
