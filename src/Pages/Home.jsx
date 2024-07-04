import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import emailjs from "emailjs-com";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://6681160056c2c76b495d730d.mockapi.io/api/library"
      );
      const booksWithStatus = res.data.map((book) => ({
        ...book,
        liked: false,
        disliked: false,
      }));
      setBooks(booksWithStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const incrementViews = async (id, currentViews) => {
    try {
      await axios.put(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`,
        {
          views: currentViews + 1,
        }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, views: currentViews + 1 } : book
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadClick = (book) => {
    incrementViews(book.id, book.views);
  };

  const handleLike = async (id, currentLikes) => {
    try {
      await axios.put(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`,
        {
          likes: currentLikes + 1,
        }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id
            ? { ...book, likes: currentLikes + 1, liked: true, disliked: false }
            : book
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (id, currentDislikes) => {
    try {
      await axios.put(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`,
        {
          dislikes: currentDislikes + 1,
        }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id
            ? {
                ...book,
                dislikes: currentDislikes + 1,
                disliked: true,
                liked: false,
              }
            : book
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (e, id) => {
    setComments({ ...comments, [id]: e.target.value });
  };

  const handleCommentSubmit = (e, book) => {
    e.preventDefault();
    const bookComment = comments[book.id];
    if (!bookComment.trim()) return;

    const templateParams = {
      to_email: "gdharan361@gmail.com",
      book_title: book.title,
      book_id: book.id,
      comment: bookComment,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams,
        "YOUR_USER_ID" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setComments({ ...comments, [book.id]: "" });
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
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
                  <strong>Publication Date:</strong>{" "}
                  {formatDate(book.publicationDate)}
                </p>
                <p className="card-text">
                  <strong>Views:</strong> {book.views}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleLike(book.id, book.likes || 0)}
                      disabled={book.disliked}
                    >
                      <AiOutlineLike /> Like {book.likes || 0}
                    </button>
                  </p>
                  <p className="card-text">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDislike(book.id, book.dislikes || 0)}
                      disabled={book.liked}
                    >
                      <AiOutlineDislike /> Dislike {book.dislikes || 0}
                    </button>
                  </p>
                </div>
                <p className="card-text text-center">
                  <Link
                    to={`/story/${book.id}`}
                    className="btn btn-success"
                    onClick={() => handleReadClick(book)}
                  >
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
