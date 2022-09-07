1- first type in terminal npm i

2-in psql terminal CREATE USER postgres WITH PASWORD "202020"
Default port is port[5432]
then CREATE THE DATEBASE type in terminal
CREATE DATABASE store_db;
CREATE DATABASE store_test_db;
GRANT ALL PRIVLLEGES ON DATEBASE store_db TO postgres;
GRANT ALL PRIVLLEGES ON DATEBASE store_test_db TO postgres;

"then you need to sync your database with the project 
so you need to look at .env file and change the varibles
to whatever suits you then look at database.json see
if there is anything needs to be adjusted"

3- using "postman" ("or whatever suits you") go to  localhost:3000/api
then test using the differnet endpoints (users,product,orders)
EX:localhost:3000/api/users

4-use the differnet methods (get,post,patch,delete) if id pram needed
EX:localhost:3000/api/users/1



variables data just in case
________________________________________________________
PORT=3000
NODE_ENV= dev
//db info
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_db
POSTGRES_TEST_DB=store_test_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=202020
 //bcrypt
BCRYPT_PASSWORD=Never_Hacked_Before
SALT_ROUNDS=10
SECRET_TOKEN=the_secret_token_is_kuro
__________________________________________
whats new?
-Mentioned the port
-fixed migrate down
-Added .env to .gitignore file.
-added the tokencheker to all product&orders method 
-added all the other model functions
-made the tokencheker in endpoint tests

i hope that iam not forgetting anything 
best of luck <3