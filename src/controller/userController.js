const UserRepository = require('../repositories/userRepository');
const UserDTO = require('../dtos/userDto');

const userRepository = new UserRepository();

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userRepository.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userDto = new UserDTO(user);
    res.json(userDto);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};