const User = require('../models/Usuario');

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