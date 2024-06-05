const User = require('../models/Usuario');
const UserRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('El usuario ya existe.');
  }

  const newUser = new User({
    email,
    password, 
    role: 'usuario'
  });

  try {
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Error al registrar el usuario.');
  }
};

module.exports = { register };

const userRepository = new UserRepository();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Implementa tu lógica de autenticación aquí
  const user = await userRepository.getUserByEmail(email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  res.json({ token });
};