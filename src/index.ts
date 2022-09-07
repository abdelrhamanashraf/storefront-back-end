import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/api', routes);
app.get('/', (__req, res) => {
  res.json({
    message: `Hello World 🌍`,
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
export default app;
