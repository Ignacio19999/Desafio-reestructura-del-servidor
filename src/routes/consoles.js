const express = require('express');
const router = express.Router();
const Console = require('../models/Console');

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
    };

    const filter = query ? { brand: query } : {};
    const consoles = await Console.paginate(filter, options);

    const totalPages = Math.ceil(consoles.total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevLink = hasPrevPage ? `/consoles?limit=${limit}&page=${prevPage}` : null;
    const nextLink = hasNextPage ? `/consoles?limit=${limit}&page=${nextPage}` : null;

    res.json({
      status: 'success',
      payload: consoles.docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;