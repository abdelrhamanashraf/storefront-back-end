import db from '../db/datebase';

export type product = {
  id?: number;
  name: string;
  price: number;
};

export class productModel {
  async create(p: product): Promise<product> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO product( name, price) VALUES( $1, $2) returning *';
      const result = await conn.query(sql, [p.name, p.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not create');
    }
  }

  async update(p: product): Promise<number> {
    try {
      const conn = await db.connect();
      const sql = 'UPDATE product set  name = $1, price = $2  where id = ($3)';
      const result = await conn.query(sql, [p.name, p.price, p.id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not update');
    }
  }

  async getAllproducts(): Promise<product[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * from product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error('could not find any');
    }
  }
  async getAproduct(id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * from product WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not find the product');
    }
  }
  async delete(id: number): Promise<product> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM product WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error('could not delete');
    }
  }
}
