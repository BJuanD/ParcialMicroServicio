import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost', 
  database: 'Account-Transaction', 
  password: 'jdaniel9544', 
  port: 5432, 
});

export default pool;