const Pool = require('pg').Pool
const connection = new Pool({​​​​​
  user: 'wmewcoqahomuca',
  host: 'ec2-54-75-150-32.eu-west-1.compute.amazonaws.com',
  database: 'd6e4e41kp2e467',
  password: 'd82fe89addeca7db91e01a8931cf9a07a11b67f521ee50e799cb9e8526f28ac6',
  port: 5432,
  ssl: {rejectUnauthorized: false}
}​​​​​)
module.exports = connection;