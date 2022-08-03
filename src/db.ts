import { Pool } from "pg";

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Node-Authentication-API",
    password: "universe",
    port: 5432,
});

export default db;
