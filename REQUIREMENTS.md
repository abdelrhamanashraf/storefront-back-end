# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
___________________________________________________________________________________
                                     database schema
                                     _________________

users table
columns
id SERIAL PRIMARY KEY,
firstname VARCHAR(50),
lastname VARCHAR(50),
password VARCHAR(100)
                    _______________________________________
product table
columns
id SERIAL PRIMARY KEY,
name VARCHAR(50),
price INT
                    ______________________________________
 orders table
columns 
id Serial Primary key,
users_id int REFERENCES users(id),
CONSTRAINT users_id 
FOREIGN KEY(users_id) REFERENCES users(id) ,
product_id  int REFERENCES product(id) ,
quantity int,
status Boolean
                    _________________________________________
                             API Endpoints           
                             _____________
  users endpoint
  localhost:3000/api/users

  create   localhost:3000/api/users[POST]
  update   localhost:3000/api/users/:id[Patch] (you will need token)   
  delete   localhost:3000/api/users/:id[delete] (you will need token)
  login    localhost:3000/api/users/[post] (your id,password) 
  show     localhost:3000/api/users/:id[get] (you will need token) 
  index    localhost:3000/api/users/:id[get] (you will need token) 
                _____________________________________________________
product endpoint
localhost:3000/api/product
create [post]
update :id[Patch] (you will need token) 
index [get]
show [get]
delete :id[delete] (you will need token)
                  ______________________________________________
orders endpoint
 localhost:3000/api/orders
 create [post]
update :id[Patch] (you will need token) 
index [get] (you will need token) 
show [get] (you will need token) 
delete :id[delete] (you will need token)                

