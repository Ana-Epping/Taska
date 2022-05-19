const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', host: 'localhost', database: 'taska', password: 'postgres', port: 5432
});

const getAtividades = (request, response) => {
    //esta função é assíncrona
    pool.query('SELECT * FROM usuario ORDER BY id', (error, results) => {
        console.log(results, error)

        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getAtividades
}
