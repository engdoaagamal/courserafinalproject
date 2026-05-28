const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Required for Promise/Async tasks

// Register a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Task 10: Get the list of books available in the shop using Async/Await
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve) => {
        resolve(books);
      });
    };
    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  const getBookByISBN = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: "Book not found" });
    }
  });

  getBookByISBN
    .then((book) => {
      return res.status(200).json(book);
    })
    .catch((err) => {
      return res.status(err.status).json({ message: err.message });
    });
});
  
// Task 12: Get book details based on author using Promises/Async
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const getBooksByAuthor = () => {
      return new Promise((resolve) => {
        let filteredBooks = [];
        Object.keys(books).forEach((key) => {
          if (books[key].author.toLowerCase() === author.toLowerCase()) {
            filteredBooks.push({
              isbn: key,
              title: books[key].title,
              reviews: books[key].reviews
            });
          }
        });
        resolve(filteredBooks);
      });
    };

    const result = await getBooksByAuthor();
    return res.status(200).json({ booksbyauthor: result });
  } catch (error) {
    return res.status(500).json({ message: "Error filtering by author" });
  }
});

// Task 13: Get all books based on title using Promises/Async
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const getBooksByTitle = () => {
      return new Promise((resolve) => {
        let filteredBooks = [];
        Object.keys(books).forEach((key) => {
          if (books[key].title.toLowerCase() === title.toLowerCase()) {
            filteredBooks.push({
              isbn: key,
              author: books[key].author,
              reviews: books[key].reviews
            });
          }
        });
        resolve(filteredBooks);
      });
    };

    const result = await getBooksByTitle();
    return res.status(200).json({ booksbytitle: result });
  } catch (error) {
    return res.status(500).json({ message: "Error filtering by title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this ISBN" });
  }
});

module.exports = public_users;
