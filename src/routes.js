const {
  getAllBooks,
  addBooks,
  getBooksById,
  editBooks,
  deleteBooksById,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksById,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooks,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksById,
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
];

module.exports = routes;
