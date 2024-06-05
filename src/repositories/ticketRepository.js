const DAOFactory = require('../daos/factories/daoFactory');

class TicketRepository {
  constructor() {
    this.dao = DAOFactory.getDAO('ticket');
  }

  async saveTicket(ticket) {
    return await this.dao.save(ticket);
  }
}

module.exports = TicketRepository;