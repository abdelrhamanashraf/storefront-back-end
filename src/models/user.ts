import db from '../db/datebase';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
//

export type user = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};
const paper = process.env.BCRYPT_PASSWORD;
const saltrounds = process.env.SALT_ROUNDS;

export class UserModel {
  async create(u: user): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = `INSERT INTO users( firstName, lastName, password) VALUES($1, $2, $3) returning *`;
      const hashpassword = bcrypt.hashSync(
        u.password + paper,
        parseInt(saltrounds as string)
      );

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashpassword,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`user${u.firstname}${u.lastname} could not be created`);
    }
  }
  async update(u: user): Promise<user> {
    try {
      const conn = await db.connect();
      const sql = `UPDATE users set  firstname = $1, lastname = $2, password = $3  where id = ($4) returning *`;
      const hashpassword = bcrypt.hashSync(
        u.password + paper,
        parseInt(saltrounds as string)
      );
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hashpassword,
        u.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`user${u.firstname}${u.lastname} could not be updated`);
    }
  }
  async getusers(): Promise<user[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * from users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`users could not be shown`);
    }
  }
  async getuser(id: number | string): Promise<number> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users where id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`users could not be shown`);
    }
  }
  async delete(id: number | string): Promise<number> {
    try {
      const conn = await db.connect();
      const sql = `DELETE FROM users WHERE id=$1 RETURNING *`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`users could not be deleted`);
    }
  }
  async loginauth(id: number, password: string): Promise<user | null> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT password FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      if (result.rows.length) {
        const digestedPassword = result.rows[0].password;

        if (bcrypt.compareSync(password, digestedPassword)) {
          return result.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`users can not login`);
    }
  }
}
