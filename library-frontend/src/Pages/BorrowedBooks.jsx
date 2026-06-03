import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/BorrowedBooks.css";

function BorrowedBooks() {

    const [books, setBooks] = useState([]);

    const fetchBorrowedBooks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/borrow/borrowed-books",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Borrowed Books:", response.data);

            setBooks(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to fetch borrowed books");
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const returnBook = async (recordId) => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                `http://localhost:8080/borrow/return/${recordId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Book returned successfully");

            fetchBorrowedBooks();

        } catch (error) {

            console.log(error);

            if (error.response?.status === 403) {
                alert("You are not authorized to return this book");
            } else {
                alert("Failed to return book");
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="borrow-container">

                <h2>📚 My Borrowed Books</h2>

                <p>Total Borrowed Books: {books.length}</p>

                {books.length === 0 ? (
                    <p>No borrowed books found</p>
                ) : (
                    <div className="borrow-grid">

                        {books.map((book) => (
                            <div
                                className="borrow-card"
                                key={book.recordId}
                            >

                                <h3>{book.bookTitle}</h3>

                                <p>
                                    <strong>Author:</strong> {book.author}
                                </p>

                                <p>
                                    <strong>Borrow Date:</strong> {book.borrowDate}
                                </p>

                                <p>
                                    <strong>Return Date:</strong>{" "}
                                    {book.returnDate || "Not Returned Yet"}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {book.returned ? "Returned" : "Not Returned"}
                                </p>

                                <p>
                                    <strong>Fine:</strong> ₹{book.fine}
                                </p>

                                {!book.returned && (
                                    <button
                                        onClick={() => returnBook(book.recordId)}
                                    >
                                        Return Book
                                    </button>
                                )}

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </>
    );
}

export default BorrowedBooks;