import React, { useState, useEffect } from "react";
import axios from "axios";

const Chart = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalAuthors, setTotalAuthors] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://6681160056c2c76b495d730d.mockapi.io/api/library"
      );
      const booksData = res.data;

      // Setting total books count
      setTotalBooks(booksData.length);

      // Extracting unique authors and setting total authors count
      const uniqueAuthors = [...new Set(booksData.map((book) => book.author))];
      setTotalAuthors(uniqueAuthors.length);

      // Calculate total views
      const views = booksData.reduce((sum, book) => sum + (book.views || 0), 0);
      setTotalViews(views);

      // Calculate total likes and dislikes
      const likes = booksData.reduce((sum, book) => sum + (book.likes || 0), 0);
      setTotalLikes(likes);

      const dislikes = booksData.reduce(
        (sum, book) => sum + (book.dislikes || 0),
        0
      );
      setTotalDislikes(dislikes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 text-center">
      <div className="row mb-4">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Books Upload Count</h2>
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Uploaded Books</h5>
              <p className="card-text display-1">{totalBooks}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Authors Upload Count</h2>
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Uploaded Authors</h5>
              <p className="card-text display-1">{totalAuthors}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2 className="text-center mb-4">Total Views Count</h2>
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Views</h5>
              <p className="card-text display-1">{totalViews}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Total Like Count</h2>
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Likes</h5>
              <p className="card-text display-1">{totalLikes}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Total Dislike Count</h2>
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Dislikes</h5>
              <p className="card-text display-1">{totalDislikes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
