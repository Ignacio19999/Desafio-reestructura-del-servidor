require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose')
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { isAdmin, isUser } = require('./middlewares/authMiddleware');
const sessionRouter = require('./src/routes/session.router');
const viewsRouter = require('./src/routes/views.router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const hbs = exphbs.create({

});

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// Passport
require('./src/config/passport-local.config')(passport);
require('./src/config/passport-github.config')(passport);

// Configuración de la sesión
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Inicio de Passport
app.use(passport.initialize());
app.use(passport.session());

//  Mongo
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/session', sessionRouter);
app.use('/views', viewsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/carts', authenticateToken, cartRoutes);
app.use('/api', mockRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: String
});

// modelo de usuario
const User = mongoose.model('User', userSchema);

// esquema del carrito
const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }]
});

// modelo de carrito
const Cart = mongoose.model('Cart', cartSchema);

// esquema del ticket
const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchaseDatetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: String
});

// modelo de ticket
const Ticket = mongoose.model('Ticket', ticketSchema);

// Rutas y controladores
app.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear un nuevo usuario
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

app.get('/current', authMiddleware, async (req, res) => {
  try {
    const currentUser = req.user;
    
    const userDTO = {
      username: currentUser.username,
      email: currentUser.email,
      role: currentUser.role
    };
    res.json(userDTO);
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    res.status(500).json({ error: 'Error al obtener usuario actual' });
  }
});

app.post('/carts/:cid/purchase', authMiddleware, async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    
    const ticket = new Ticket({
      code: generateTicketCode(),
      amount: totalAmount,
      purchaser: req.user.email
    });
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    res.status(500).json({ error: 'Error al finalizar la compra' });
  }
});

// Función para generar un código único para el ticket
function generateTicketCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Middleware de autorización
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secreto');
    req.user = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ error: 'Error de autenticación' });
  }
};

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

