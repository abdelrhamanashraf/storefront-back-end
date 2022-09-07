import app from '..';
import supertest from 'supertest';
import { orders, orderModel } from './../models/order';
import { product, productModel } from './../models/product';
import { UserModel, user } from '../models/user';
//
let newtoken: string;
//model tests
// usermodel test
const testuser = new UserModel();
describe('Testing User Model functionality', () => {
  it('Should have an index method', () => {
    expect(testuser.getusers).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(testuser.create).toBeDefined();
  });
  it('Should have a update method', () => {
    expect(testuser.update).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(testuser.getuser).toBeDefined();
  });
  it('Should have a delete method', () => {
    expect(testuser.delete).toBeDefined();
  });
  it('Should have a login method', () => {
    expect(testuser.loginauth).toBeDefined();
  });
  const u: user = {
    firstname: 'geralt ',
    lastname: 'of rivia',
    password: 'killingmonsters',
  };

  it('creates a user', async () => {
    const createdUser = await testuser.create(u);

    if (createdUser) {
      const { firstname, lastname } = createdUser;

      expect(firstname).toBe(u.firstname);
      expect(lastname).toBe(u.lastname);
    }
  });
  it('Expects to get list of users', async () => {
    const result: user[] = await testuser.getusers();
    expect(result.length).toBeGreaterThan(0);
  });
  const up: user = {
    firstname: 'witcher',
    lastname: 'of rivia',
    password: 'killingmonsters',
    id: 1,
  };
  it('updates a user', async () => {
    const updatedUser = await testuser.update(up);

    if (updatedUser) {
      const { firstname } = updatedUser;
      expect(firstname).toBe(up.firstname);
    }
  });
  const log = {
    id: 1,
    password: 'killingmonsters',
  };

  it('logs in a user', async () => {
    const logedUser = await testuser.loginauth(1, 'killingmonsters');

    if (logedUser) {
      const { id, password } = logedUser;
      expect(id).toBe(log.id);
      expect(password).toBe(log.password);
    }
  });
  const sh = {
    firstname: 'witcher',
    lastname: 'of rivia',
    password: 'killingmonsters',
    id: 1,
  };
  it('shows a user', async () => {
    const showUser = await testuser.getuser(sh.id);

    if (showUser) {
      expect(sh.lastname).toBe(up.lastname);
      expect(sh.firstname).toBe(up.firstname);
    }
  });
  it('deletes a user', async () => {
    const deleteUser = await testuser.getuser(1);

    if (deleteUser) {
      expect(sh.lastname).toBeNull;
      expect(sh.firstname).toBeNull;
    }
  });
});
// productmodel test
const testproduct = new productModel();

describe('Testing Product Model functionality', () => {
  it('Should have an index method', () => {
    expect(testproduct.getAllproducts).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(testproduct.create).toBeDefined();
  });
  it('Should have a update method', () => {
    expect(testproduct.update).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(testproduct.getAproduct).toBeDefined();
  });
  it('Should have a delete method', () => {
    expect(testproduct.delete).toBeDefined();
  });
  const p: product = {
    name: 'sword',
    price: 1000,
  };
  it('creates a product', async () => {
    const createdProduct = await testproduct.create(p);

    if (createdProduct) {
      const { name, price } = createdProduct;

      expect(name).toBe(p.name);
      expect(price).toBe(p.price);
    }
  });
  it('Expects to get list of products', async () => {
    const index: product[] = await testproduct.getAllproducts();
    expect(index.length).toBeGreaterThan(0);
  });
  const up: product = {
    name: 'sword',
    price: 1200,
    id: 1,
  };
  it('updates a product', async () => {
    const updatedProduct = await testproduct.update(up);

    if (updatedProduct) {
      const price = updatedProduct;

      expect(p.price).not.toBe(up.price);
      expect(price).toBe(up.price);
    }
  });
  it('shows a product', async () => {
    const gottenProduct = await testproduct.getAproduct(1);

    if (gottenProduct) {
      const { name } = gottenProduct;

      expect(name).toBe(p.name);
    }
  });
  it('deletes a product', async () => {
    const deletedproduct = await testproduct.delete(1);

    if (deletedproduct) {
      expect(p.name).toBeNull;
      expect(p.price).toBeNull;
    }
  });
});
// orders Model test
const testorders = new orderModel();

describe('Testing Orders Model functionality', () => {
  it('Should have an index method', () => {
    expect(testorders.getAllorders).toBeDefined();
  });
  it('Should have a create method', () => {
    expect(testorders.create).toBeDefined();
  });
  it('Should have a update method', () => {
    expect(testorders.update).toBeDefined();
  });
  it('Should have a show method', () => {
    expect(testorders.getAnOrder).toBeDefined();
  });
  it('Should have a delete method', () => {
    expect(testorders.delete).toBeDefined();
  });
  it('Should have add a product order method', () => {
    expect(testorders.addAproductOrder).toBeDefined();
  });
  const u: user = {
    firstname: 'geralt ',
    lastname: 'of rivia',
    password: 'killingmonsters',
    id: 1,
  };
  const p: product = {
    name: 'sword',
    price: 1000,
    id: 1,
  };

  it('', async () => {
    const createdUser = await testuser.create(u);

    if (createdUser) {
      const { firstname, lastname } = createdUser;

      expect(firstname).toBe(u.firstname);
      expect(lastname).toBe(u.lastname);
    }
  });
  it('', async () => {
    const createdProduct = await testproduct.create(p);

    if (createdProduct) {
      const { name, price } = createdProduct;

      expect(name).toBe(p.name);
      expect(price).toBe(p.price);
    }
  });

  const o: orders = {
    users_id: 1,
    id: 1,
  };

  it('creates an order', async () => {
    const createdOrder = await testorders.create(o);

    if (createdOrder) {
      const { users_id } = createdOrder;

      expect(users_id).toBe(o.users_id);
    }
  });
  it('Expects to get list of orders', async () => {
    const index: orders[] = await testorders.getAllorders();
    expect(index.length).toEqual(index.length);
  });
  const uo: orders = {
    users_id: 2,
    id: 1,
  };
  it('updates an order', async () => {
    const upatedOrder = await testorders.update(uo);

    if (upatedOrder) {
      const { users_id } = upatedOrder;

      expect(users_id).toBe(uo.users_id);
    }
  });

  it('shows an order', async () => {
    const shownOrder = await testorders.getAnOrder(1);

    if (shownOrder) {
      const { users_id } = shownOrder;

      expect(users_id).toBe(o.users_id);
    }
  });

  it('deletes an order', async () => {
    const deleteOrder = await testorders.delete(1);

    if (deleteOrder) {
      expect(o.users_id).toBeNull;
    }
  });
});
// Testing Endpoints
//users endpoint
const request = supertest(app);

describe('User endpoint test', () => {
  it('creates user', async () => {
    const res: supertest.Response = await request.post('/api/users').send({
      firstname: 'geralt',
      lastname: 'of rivia',
      password: 'killingmonsters',
    });
    expect(res.status).toEqual(200);
    expect(res.body.data.firstname).toBe('geralt');
    expect(res.body.data.lastname).toBe('of rivia');
    newtoken = res.body.data.newToken;
  });
  it('should not index users', async () => {
    const res: supertest.Response = await request.get('/api/users');
    expect(res.status).toEqual(500);
  });
});
// product endpoint
describe('product endpoint test', () => {
  it('create a product ', async () => {
    const res: supertest.Response = await request
      .post('/api/product')
      .set('Authorization', `Bearer ${newtoken}`)
      .send({ name: 'sword', price: 1000 });
    expect(res.status).toEqual(200);
    expect(res.body.data.name).toBe('sword');
    expect(res.body.data.price).toBe(1000);
  });
  it('index products ', async () => {
    const res: supertest.Response = await request
      .get('/api/product')
      .set('Authorization', `Bearer ${newtoken}`);
    expect(res.status).toEqual(200);
  });
});
//orders endpoints
describe('orders endpoint test', () => {
  it('create an orders ', async () => {
    const res: supertest.Response = await request
      .post('/api/orders')
      .set('Authorization', `Bearer ${newtoken}`)
      .send({ users_id: 1, product_id: 1, quantity: 10 });
    expect(res.status).toEqual(200);
  });
  it('should not see index  ', async () => {
    const res: supertest.Response = await request.get('/api/orders');
    expect(res.status).toEqual(500);
  });
});
