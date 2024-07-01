import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
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
  const formatDateOfBirth = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleEdit = (id) => {
    navigate(`/editauthor/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`
      );
      fetchAuthors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Authors</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {authors.map((author) => (
          <div key={author.id} className="col">
            <div className="card h-100">
              {author.authorimage && (
                <img
                  src={author.authorimage}
                  className="card-img-top"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                  alt={`Image for ${author.author}`}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{author.author}</h5>
                <p className="card-text">
                  <strong>Date of Birth:</strong>{" "}
                  {formatDateOfBirth(author.authordob)}
                </p>
                <p className="card-text">
                  <strong>Biography:</strong> {author.biography}
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(author.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDelete(author.id)}
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

export default ManageAuthors;
