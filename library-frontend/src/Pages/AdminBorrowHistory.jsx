import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminBorrowHistory() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/borrow/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRecords(response.data);

        } catch (error) {

            console.log(error);

            if (error.response?.status === 403) {
                alert("Only Admin can view borrow history");
            } else {
                alert("Failed to load borrow history");
            }
        }
    };

    return (
        <>
            <Navbar />

            <div className="container">

                <h2>📚 Admin Borrow History</h2>

                <table border="1" cellPadding="10">

                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Borrow Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Fine</th>
                        </tr>
                    </thead>

                    <tbody>

                        {records.map((record, index) => (

                            <tr key={index}>

                                <td>{record.userName}</td>

                                <td>{record.email}</td>

                                <td>{record.bookTitle}</td>

                                <td>{record.author}</td>

                                <td>{record.borrowDate}</td>

                                <td>
                                    {record.returnDate || "Not Returned"}
                                </td>

                                <td>
                                    {record.returned
                                        ? "Returned"
                                        : "Borrowed"}
                                </td>

                                <td>₹{record.fine}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default AdminBorrowHistory;