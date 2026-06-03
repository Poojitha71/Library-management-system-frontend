import { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import Navbar from "./Navbar";
function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/books/delete/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Book Deleted Successfully");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 403) {
        alert("You are not authorized to delete books");
      } else {
        alert("Failed to delete book");
      }
    }
  };
  
  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/books/get/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <>
      <Navbar />
      <div className="books-container">
        <h2 className="books-title">Books Library</h2>

        <p className="books-count">Total Books: {books.length}</p>

        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <h3>{book.title}</h3>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>

              <p className={book.available ? "available" : "not-available"}>
                {book.available ? "Available" : "Not Available"}
              </p>

              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Books;
