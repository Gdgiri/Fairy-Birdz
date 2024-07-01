import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Story = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`
      );
      setBook(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <img
              src={book.image}
              className="card-img-top img-fluid"
              alt={book.title}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "cover",
                margin: "auto", // Center the image
              }}
            />
            <div className="card-body">
              <h5 className="card-title text-center">{book.title}</h5>
              <p className="card-text" style={{ textAlign: "justify" }}>
                {book.story}
              </p>
              <p className="card-text text-end">
                <strong>Author:</strong> {book.author}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
