import { useState } from "react";
import axios from "axios";

function AddBook() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");

    const handleAddBook = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:8080/books/add/book",
                {
                    title,
                    author,
                    isbn,
                    available: true
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            alert("Book Added Successfully");

            setTitle("");
            setAuthor("");
            setIsbn("");

        } catch (error) {

            console.log(error);
        
            if (error.response?.status === 403) {
        
                alert("You are not authorized to add a book");
        
            } else {
        
                alert("Failed To Add Book");
            }
        }
    };

    return (
        <div className="add-book-container">

            <h2>Add New Book</h2>

            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Enter ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
            />

            <br /><br />

            <button onClick={handleAddBook}>
                Add Book
            </button>

        </div>
    );
}

export default AddBook;