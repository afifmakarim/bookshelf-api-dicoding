const { nanoid } = require('nanoid');

const bookShelf = [];

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const searchResult = bookShelf
      .filter(
        (word) => word.name.toLowerCase().indexOf(name.toLowerCase()) > -1
      )
      .map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));
    const response = h.response({
      status: 'success',
      data: {
        books: searchResult,
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    const searchResult = bookShelf
      .filter((book) => book.reading == reading)
      .map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));
    const response = h.response({
      status: 'success',
      data: {
        books: searchResult,
      },
    });
    response.code(200);
    return response;
  }

  if (finished) {
    const searchResult = bookShelf
      .filter((book) => book.finished == finished)
      .map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      }));
    const response = h.response({
      status: 'success',
      data: {
        books: searchResult,
      },
    });
    response.code(200);
    return response;
  }

  const searchResult = bookShelf.map((b) => ({
    id: b.id,
    name: b.name,
    publisher: b.publisher,
  }));

  const response = h.response({
    status: 'success',
    data: {
      books: searchResult,
    },
  });
  response.code(200);
  return response;
};

const addBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(10);
  const insertedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt: insertedAt,
  };

  const isSuccess = bookShelf.filter((book) => book.id === id).length >= 0;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (isSuccess) {
    bookShelf.push(newBook);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBooksById = (request, h) => {
  const { id } = request.params;

  const book = bookShelf.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBooks = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = bookShelf.findIndex((n) => n.id === id);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    bookShelf[index] = {
      ...bookShelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBooksById = (request, h) => {
  const { id } = request.params;

  const index = bookShelf.findIndex((book) => book.id === id);

  if (index !== -1) {
    bookShelf.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  getAllBooks,
  addBooks,
  getBooksById,
  editBooks,
  deleteBooksById,
};
