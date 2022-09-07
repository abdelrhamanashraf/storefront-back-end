import db from '../db/datebase';

export type orders = {
  id?: number;
  users_id: number;
};

export type orders_products = {
  id?: number;
  status?: boolean;
  product_id: number;
  quantity: number;
  users_id?: number;
};

export class orderModel {
  async create(o: orders): Promise<orders> {
    try {
      const conn = await db.connect();
      const sql = 'INSERT INTO orders (users_id) VALUES($1) returning*';
      const result = await conn.query(sql, [o.users_id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not create');
    }
  }
  async update(o: orders): Promise<orders> {
    try {
      const conn = await db.connect();
      const sql = 'UPDATE orders set users_id = $1 where id = ($2)';
      const result = await conn.query(sql, [o.users_id, o.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not update');
    }
  }
  async getAllorders(): Promise<orders[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * from orders_products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('could not find any');
    }
  }
  async getAnOrder(id: number): Promise<orders> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * from orders_products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not find the order');
    }
  }
  async delete(id: number): Promise<orders> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not delete the order');
    }
  }
  async addAproductOrder(op: orders_products): Promise<orders_products> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO orders_products(product_id, quantity,id) VALUES( $1, $2,$3) returning * ';

      const result = await conn.query(sql, [
        op.product_id,
        op.quantity,
        op.users_id,
      ]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not create');
    }
  }
}
