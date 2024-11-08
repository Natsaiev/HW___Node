import mysql from 'mysql2/promise';
import "dotenv/config";

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

db.getConnection((err, connection) => {
    if(err) {
        console.log("Error connecting to database: ", err);
        return;
    }
    console.log("Connected to database successfully");
})

export default db;
