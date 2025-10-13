import express from 'express';
import type { Express } from 'express';
import { createProduct, listProduct } from './controllers/product.ts';

const app: Express = express();

app.use(express.json());

// Routes
app.get('/', listProduct);
app.post('/', createProduct);

// Sequelize Start
// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Database synced");
//   } catch (error) {
//     console.error(error);
//   }
// })();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
