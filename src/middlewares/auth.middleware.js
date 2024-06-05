const UserRepository = require('../repositories/userRepository');

const userRepository = new UserRepository();

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userRepository.getUserById(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const user = await userRepository.getUserById(req.user.id);
    if (user && user.role === 'user') {
      next();
    } else {
      res.status(403).json({ message: 'Access forbidden: Users only' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    
    userIsLoggedIn: (req, res, next) => {
        const isLoggedIn = ![null, undefined].includes(req.session.user)
        if (!isLoggedIn) {
            return res.status(401).json({ error:'El usuario ya esta logeado'})
        }

        next()
    },

    userIsNotLoggedIn: (req, res, next) => {
        const isLoggedIn = ![null, undefined].includes(req.session.user)
        if (isLoggedIn) {
            return res.status(401).json({ error: 'No iniciaste sesion'})
        }

        next()
    }
}

