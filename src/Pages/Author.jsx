import React, { useState, useEffect } from "react";
import axios from "axios";

const Author = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://6681160056c2c76b495d730d.mockapi.io/api/library"
      );
      setAuthors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to format date of birth
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {authors.map((author) => (
          <div className="col" key={author.id}>
            <div className="card h-100">
              <img
                src={author.authorimage}
                className="card-img-top img-fluid"
                alt={author.authorname}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Author Name: </strong>
                  {author.author}
                </h5>
                <h6 className="card-subtitle mb-2">
                  <strong>Date of Birth: </strong>
                  {formatDate(author.authordob)}
                </h6>

                <p className="card-text">
                  <strong>Biography: </strong> {author.biography}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Author;
