const Ticket = require('../models/ticketModel');

class TicketDAO {
  async save(ticket) {
    return await Ticket.create(ticket);
  }
}

module.exports = TicketDAO;