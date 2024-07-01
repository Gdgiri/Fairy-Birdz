import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const navigate = useNavigate();

  // Function to generate a random 13-digit ISBN with hyphens
  const generateISBN = () => {
    const part1 = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const part2 = Math.floor(Math.random() * 10);
    const part3 = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const part4 = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const part5 = Math.floor(Math.random() * 10);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      author: "",
      authordob: "",
      biography: "",
      isbn: generateISBN(), // Initialize with generated ISBN
      story: "",
      publicationDate: getCurrentDate(),
      authorimage: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("Image URL is required"),
      title: Yup.string().required("Book title is required"),
      author: Yup.string().required("Author name is required"),
      authordob: Yup.date()
        .typeError("Author's Date of Birth must be a valid date")
        .required("Author's Date of Birth is required"),
      biography: Yup.string().required("Author's Biography is required"),
      isbn: Yup.string()
        .matches(
          /^\d{3}-\d-\d{3}-\d{5}-\d$/,
          "ISBN must be in the format 123-4-567-89011-4"
        )
        .required("ISBN number is required"),
      story: Yup.string().required("Story is required"),
      publicationDate: Yup.date()
        .typeError("Publication date must be a valid date")
        .required("Publication date is required"),
      authorimage: Yup.string().required("Author Image URL is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://6681160056c2c76b495d730d.mockapi.io/api/library",
          values
        );
        alert("Book created successfully");
        navigate("/"); // Redirect to the home page
      } catch (error) {
        console.error("Error creating book:", error);
      }
    },
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center">Create New Book</h2>
      <form onSubmit={formik.handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.image && formik.errors.image
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="invalid-feedback">{formik.errors.image}</div>
          ) : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Book Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.title && formik.errors.title
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="invalid-feedback">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="author" className="form-label">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.author && formik.errors.author
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.author && formik.errors.author ? (
            <div className="invalid-feedback">{formik.errors.author}</div>
          ) : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="authordob" className="form-label">
            Author Date of Birth:
          </label>
          <input
            type="date"
            id="authordob"
            name="authordob"
            value={formik.values.authordob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.authordob && formik.errors.authordob
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.authordob && formik.errors.authordob ? (
            <div className="invalid-feedback">{formik.errors.authordob}</div>
          ) : null}
        </div>
        <div className="col-12">
          <label htmlFor="biography" className="form-label">
            Author Biography:
          </label>
          <textarea
            id="biography"
            name="biography"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.biography && formik.errors.biography
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.biography && formik.errors.biography ? (
            <div className="invalid-feedback">{formik.errors.biography}</div>
          ) : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="isbn" className="form-label">
            ISBN Number:
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.isbn && formik.errors.isbn
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.isbn && formik.errors.isbn ? (
            <div className="invalid-feedback">{formik.errors.isbn}</div>
          ) : null}
        </div>
        <div className="col-12">
          <label htmlFor="story" className="form-label">
            Story:
          </label>
          <textarea
            id="story"
            name="story"
            value={formik.values.story}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.story && formik.errors.story
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.story && formik.errors.story ? (
            <div className="invalid-feedback">{formik.errors.story}</div>
          ) : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="publicationDate" className="form-label">
            Publication Date:
          </label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={formik.values.publicationDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.publicationDate && formik.errors.publicationDate
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.publicationDate && formik.errors.publicationDate ? (
            <div className="invalid-feedback">
              {formik.errors.publicationDate}
            </div>
          ) : null}
        </div>
        <div className="col-md-6">
          <label htmlFor="authorimage" className="form-label">
            Author Image URL:
          </label>
          <input
            type="text"
            id="authorimage"
            name="authorimage"
            value={formik.values.authorimage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.authorimage && formik.errors.authorimage
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {formik.touched.authorimage && formik.errors.authorimage ? (
            <div className="invalid-feedback">{formik.errors.authorimage}</div>
          ) : null}
        </div>
        <div className="col-12 mt-3 text-center m-4">
          <button type="submit" className="btn btn-primary">
            Create Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default Book;
