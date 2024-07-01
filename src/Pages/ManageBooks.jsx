import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);
  const navigate = useNavigate();

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

  const handleEdit = (id) => {
    navigate(`/editbooks/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadMoreToggle = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Books</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {books.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100">
              {book.image && (
                <img
                  src={book.image}
                  alt={`Image for ${book.title}`}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <div className="text-center mb-3">
                  <h5 className="card-title">{book.title}</h5>
                </div>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="card-text">
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p className="card-text">
                  <strong>Publication Date:</strong> {book.publicationDate}
                </p>
                <p className="card-text">
                  {expandedBookId === book.id ? book.story : `${book.story.substring(0, 100)}...`}
                  <button
                    onClick={() => handleReadMoreToggle(book.id)}
                    className="btn btn-link btn-sm p-0 ms-2"
                  >
                    {expandedBookId === book.id ? "Read Less" : "Read More"}
                  </button>
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
