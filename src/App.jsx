import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Books from "./Pages/Books";
import Author from "./Pages/Author";
import ManageBooks from "./Pages/ManageBooks";
import ManageAuthor from "./Pages/ManageAuthor";
import EditBooks from "./Pages/EditBooks";
import EditAuthor from "./Pages/EditAuthor";
import Story from "./Pages/Story";
import Chart from "./Pages/Chart"; // Updated import

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Chart />} /> {/* Updated Route */}
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/author" element={<Author />} />
          <Route path="/managebooks" element={<ManageBooks />} />
          <Route path="/manageauthor" element={<ManageAuthor />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/editbooks/:id" element={<EditBooks />} />
          <Route path="/editauthor/:id" element={<EditAuthor />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
