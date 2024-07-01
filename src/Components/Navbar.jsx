import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdb8vWPtoDyAEPK5tBhS_XC87JAxfKIjjOdnOslGmtKpmwuzb6Btw5zMurYYs1H9Qfhpc&usqp=CAU"
              alt="Bootstrap"
              width="100"
              height="60"
            />
          </a>
          <a className="navbar-brand text-white" href="#">
            Fairy Birdz
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-center" /> |||
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <Link className="nav-link text-white " to="/">
                  <span>
                    <i class="bi bi-speedometer2"></i>
                  </span>{" "}
                  Dashboard
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link text-white " to="/home">
                  <span>
                    <i class="bi bi-house-fill"></i>
                  </span>{" "}
                  Books
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link text-white " to="/author">
                  <span>
                    <i class="bi bi-people"></i>
                  </span>{" "}
                  Authors
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link text-white " to="/books">
                  <span>
                    <i class="bi bi-book-fill"></i>
                  </span>{" "}
                  Create Books
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link text-white " to="/managebooks">
                  <span>
                    <i class="bi bi-pencil-square"></i>
                  </span>{" "}
                  Manage-Books
                </Link>
              </li>

              <li class="nav-item">
                <Link className="nav-link text-white " to="/manageauthor">
                  <span>
                    <i class="bi bi-pencil-square"></i>
                  </span>{" "}
                  Manage-Authors
                </Link>
              </li>
            </ul>
            <button className="btn btn-danger">
              <span className="m-2">
                <i class="bi bi-box-arrow-left"></i>
              </span>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
