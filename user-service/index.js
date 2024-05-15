const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Configuración para parsear JSON
app.use(bodyParser.json());

// Cadena de conexión a MongoDB Atlas
const mongoUri = 'mongodb+srv://juanomonte:sebas2018@cluster0.z7cbnl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri.replace('sebas2018', 'sebas2018'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas (Users)'))
.catch((error) => console.error('Failed to connect to MongoDB Atlas', error));

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('User service is running');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/register', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`User service listening on port ${port}`);
});
