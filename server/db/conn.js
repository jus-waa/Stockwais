import { Pool } from 'pg'; //a node-postgre
import dotenv from 'dotenv'; 

dotenv.config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    max: 20, //max connections
    idleTimeoutMillis: 30000, //idle timeout 30secs
    connectionTimeoutMillis: 2000, //if a new client cant connect within 2secs throw error
    maxLifetimeSeconds: 60 //limit of how long a connection live
});

const query = (text, params) => pool.query(text, params); //pg.query

export { query }; //allows import query directly
export default { query }; //allows importing query as a default object