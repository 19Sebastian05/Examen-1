// index.js (Servicio de Productos)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://juanomonte:sebas2018@cluster0.z7cbnl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas (Products)');
}).catch((error) => {
  console.error('Failed to connect to MongoDB Atlas', error);
});

// Definición del esquema y modelo de Producto
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String
});

const Product = mongoose.model('Product', productSchema);

// Ruta raíz para verificar que el servicio está funcionando
app.get('/', (req, res) => {
  res.send('Product service is running');
});

// Ruta para agregar un producto
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para listar productos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Product service running at http://localhost:${port}`);
});
