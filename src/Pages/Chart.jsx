import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Chart = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://6681160056c2c76b495d730d.mockapi.io/api/library"
      );
      setBooks(res.data);

      // Extracting unique authors
      const uniqueAuthors = [...new Set(res.data.map((book) => book.author))];
      setAuthors(uniqueAuthors);
    } catch (error) {
      console.log(error);
    }
  };

  const totalBooks = books.length;
  const totalAuthors = authors.length;

  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Books Upload Count</h2>
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Uploaded Books</h5>
              <p className="card-text display-1">{totalBooks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Authors Upload Count</h2>
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Uploaded Authors</h5>
              <p className="card-text display-1">{totalAuthors}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {books.map((book) => (
          <div className="col" key={book.id}>
            <div className="card h-100">
              <div className="img-container">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="card-text">
                  <strong>Publication Date:</strong> {book.publicationDate}
                </p>
                <p className="card-text text-center">
                  <Link to={`/story/${book.id}`} className="btn btn-success">
                    Read
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
