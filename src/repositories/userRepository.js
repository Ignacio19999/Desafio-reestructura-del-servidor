const DAOFactory = require('../daos/factories/daoFactory');

class UserRepository {
  constructor() {
    this.dao = DAOFactory.getDAO('user');
  }

  async getUserById(id) {
    return await this.dao.findById(id);
  }

  async getUserByEmail(email) {
    return await this.dao.findByEmail(email);
  }

  async saveUser(user) {
    return await this.dao.save(user);
  }

  async updateUser(id, user) {
    return await this.dao.update(id, user);
  }

  async deleteUser(id) {
    return await this.dao.delete(id);
  }
}

module.exports = UserRepository;