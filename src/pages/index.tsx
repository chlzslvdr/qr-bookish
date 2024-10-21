import { useState } from "react";
import axios from "axios";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import QRCode from "antd/lib/qr-code";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import message from "antd/lib/message";

interface BookInfo {
  title: string;
  author: string;
  publisher?: string;
}

const Home = () => {
  const [query, setQuery] = useState("");
  const [bookInfo, setBookInfo] = useState<BookInfo>();
  const [bookUrl, setBookUrl] = useState("");
  const [error, setError] = useState("");

  const fetchBookInfo = async () => {
    try {
      const response = await axios.get(
        `/api/fetchBookInfo?query=${encodeURIComponent(query)}`
      );

      if (response.status === 200) {
        const { bookUrl, bookDetails } = response.data;
        setBookInfo(bookDetails);
        setBookUrl(bookUrl);
        setError("");
      } else {
        throw new Error("No books found");
      }
    } catch (err) {
      console.error(err);
      setError("No books found or there was an error with the search.");
      setBookUrl("");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "bookish-qr-code.png";
      link.click();
    } else {
      message.error("Failed to download the QR code.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row align="middle" justify="center">
        <Col xs={2} sm={4} md={8} lg={1}>
          <img
            src="https://chlzslvdr.sirv.com/bookish/bookish.png"
            alt="QR Bookish"
            style={{ width: "50px" }}
          />
        </Col>
        <Col>
          <h1>Bookish QR Code Generator</h1>
        </Col>
      </Row>

      <Row justify="center" gutter={[8, 8]}>
        <Col sm={16} md={8} lg={4}>
          <Input
            placeholder="Search for a book"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
        <Col sm={16} md={8} lg={4}>
          <Button
            type="primary"
            onClick={fetchBookInfo}
            style={{ width: "100%" }}
          >
            Search
          </Button>
        </Col>
      </Row>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookInfo && bookUrl && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>QR Code for Book Information</h2>
          <QRCode
            value={bookUrl}
            size={256}
            icon="https://chlzslvdr.sirv.com/bookish/bookish.png"
          />

          <div style={{ marginTop: "10px", textAlign: "left" }}>
            <p>
              <strong>Title:</strong> {bookInfo.title}
            </p>
            <p>
              <strong>Author:</strong> {bookInfo.author}
            </p>
            <p>
              <strong>Publisher:</strong> {bookInfo.publisher}
            </p>
          </div>

          <a
            target="_blank"
            href={bookUrl}
            rel="noopener noreferrer"
            style={{
              fontSize: "16px",
              color: "#1890ff",
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            More Book Information{" "}
            <img
              src="https://chlzslvdr.sirv.com/bookish/right-arrow.png"
              alt="Right Arrow"
              style={{ marginLeft: "5px", width: "16px", height: "16px" }}
            />
          </a>

          <br />
          <Button
            type="primary"
            onClick={downloadQRCode}
            style={{ marginTop: "10px" }}
          >
            <img
              src="https://chlzslvdr.sirv.com/bookish/download.png"
              alt="Download"
              style={{ marginRight: "5px", width: "16px", height: "16px", filter: "invert(100%)" }} 
            />
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
