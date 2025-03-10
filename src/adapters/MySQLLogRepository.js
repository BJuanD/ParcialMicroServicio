const mysql = require('mysql');
const LogRepository = require('../ports/LogRepository');

class MySQLLogRepository extends LogRepository {
    constructor() {
        super();
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        this.connection.connect(err => {
            if (err) console.error("❌ Error conectando a MySQL:", err);
            else console.log("✅ Conectado a MySQL");
        });
    }

    guardar(log) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO logs_${log.servicio} (nivel, mensaje, timestamp) VALUES (?, ?, ?)`;
            this.connection.query(query, [log.nivel, log.mensaje, log.timestamp], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    obtenerTodos() {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM logs_auth UNION SELECT * FROM logs_orders", (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = MySQLLogRepository;
