import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://6681160056c2c76b495d730d.mockapi.io/api/library"
      );
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
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

export default Home;
