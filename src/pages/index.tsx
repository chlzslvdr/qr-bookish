import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const Home = () => {
  const [query, setQuery] = useState("");
  const [bookInfo, setBookInfo] = useState("");
  const [error, setError] = useState("");

  const fetchBookInfo = async () => {
    try {
      const response = await axios.get(
        `/api/fetchBookInfo?query=${encodeURIComponent(query)}`
      );

      if (response.status === 200) {
        const { bookUrl } = response.data;
        setBookInfo(bookUrl);
        setError("");
      } else {
        throw new Error("No books found");
      }
    } catch (err) {
      console.error(err);
      setError("No books found or there was an error with the search.");
      setBookInfo("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Book QR Code Generator</h1>
      <input
        type="text"
        placeholder="Search for a book"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={fetchBookInfo} style={{ padding: "10px 20px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookInfo && (
        <div style={{ marginTop: "20px" }}>
          <h2>QR Code for Book Information</h2>
          <QRCode value={bookInfo} />
          <pre>{bookInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
