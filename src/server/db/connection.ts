import { db } from "../config";
import pg from "pg";

interface PG_Results extends pg.QueryResultBase {
    insertId?: number;
}

const pool = new pg.Pool(db);

export const Query = <T = PG_Results>(sql: string, values: unknown[] = []) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(sql, values, (err, result) => {
            if (err) reject(err);
            if (result.command === "SELECT") {
                resolve(result.rows as T);
            } else if (result.command === "INSERT") {
                const insertId = result.rows[0].id;
                resolve({ ...result, insertId } as T);
            } else {
                resolve(result as T);
            }
        });
    });
};
