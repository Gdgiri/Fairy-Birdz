import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditAuthor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [authorData, setAuthorData] = useState({
    authorimage: "",
    author: "",
    authordob: "",
    biography: "",
  });

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const res = await axios.get(
        `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`
      );
      // Set the fetched author data to state
      setAuthorData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      authorimage: authorData.authorimage,
      author: authorData.author,
      authordob: authorData.authordob,
      biography: authorData.biography,
    },
    validationSchema: Yup.object({
      authorimage: Yup.string().required("Author Image URL is required"),
      author: Yup.string().required("Author Name is required"),
      authordob: Yup.date().required("Date of Birth is required"),
      biography: Yup.string().required("Biography is required"),
    }),
    enableReinitialize: true, // Ensure formik reinitializes when initialValues change
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://6681160056c2c76b495d730d.mockapi.io/api/library/${id}`,
          values
        );
        alert("Author details updated successfully");
        navigate("/author"); // Navigate to /author after successful update
      } catch (error) {
        console.error("Error updating author:", error);
      }
    },
  });

  // Ensure form is only rendered when authorData is fetched
  if (!authorData.authorimage) return null;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Edit Author</h2>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="form text-center p-4">
          <div className="mb-3">
            <label>Author Image URL:</label>
            <input
              type="text"
              name="authorimage"
              value={formik.values.authorimage}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.authorimage && formik.errors.authorimage ? (
              <div className="text-danger">{formik.errors.authorimage}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Author Name:</label>
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
            <label>Date of Birth:</label>
            <input
              type="date"
              name="authordob"
              value={formik.values.authordob}
              onChange={formik.handleChange}
              className="form-control"
              required
            />
            {formik.touched.authordob && formik.errors.authordob ? (
              <div className="text-danger">{formik.errors.authordob}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label>Biography:</label>
            <textarea
              name="biography"
              value={formik.values.biography}
              onChange={formik.handleChange}
              className="form-control"
              rows="4"
              required
            ></textarea>
            {formik.touched.biography && formik.errors.biography ? (
              <div className="text-danger">{formik.errors.biography}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary m-3">
            Update Author
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAuthor;
