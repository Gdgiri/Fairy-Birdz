import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    image: "",
    title: "",
    author: "",
    isbn: "",
    story: "",
    publicationDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`
      );
      setBookData(res.data);
      // Set formik initial values after fetching data
      formik.setValues({
        image: res.data.image,
        title: res.data.title,
        author: res.data.author,
        isbn: res.data.isbn,
        story: res.data.story,
        publicationDate: res.data.publicationDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      author: "",
      isbn: "",
      story: "",
      publicationDate: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image URL is required"),
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      isbn: Yup.string().required("ISBN is required"),
      story: Yup.string().required("Story is required"),
      publicationDate: Yup.date().required("Publication Date is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`,
          values
        );
        alert("Book details updated successfully");
        navigate("/"); // Navigate to home or details page after update
      } catch (error) {
        console.error("Error updating book:", error);
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Edit Book</h2>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="form text-center p-4">
          <div className="mb-3">
            <label>Image URL:</label>
            <input
              type="text"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.image && formik.errors.image ? (
              <div className="text-danger">{formik.errors.image}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-danger">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.author && formik.errors.author ? (
              <div className="text-danger">{formik.errors.author}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>ISBN:</label>
            <input
              type="text"
              name="isbn"
              value={formik.values.isbn}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.isbn && formik.errors.isbn ? (
              <div className="text-danger">{formik.errors.isbn}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Story:</label>
            <textarea
              name="story"
              value={formik.values.story}
              onChange={formik.handleChange}
              className="form-control"
              rows="4"
              required
            ></textarea>
            {formik.touched.story && formik.errors.story ? (
              <div className="text-danger">{formik.errors.story}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Publication Date:</label>
            <input
              type="date"
              name="publicationDate"
              value={formik.values.publicationDate}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.publicationDate && formik.errors.publicationDate ? (
              <div className="text-danger">{formik.errors.publicationDate}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary m-3">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
