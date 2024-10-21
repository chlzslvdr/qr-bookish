import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Spin from "antd/lib/spin";

interface BookInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  imageLinks?: {
    thumbnail?: string;
  };
  previewLink?: string;
  subtitle?: string;
}

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<BookInfo | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await axios.get(`/api/bookDetails?id=${id}`);
          setBook(response.data);
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      };
      fetchBookDetails();
    }
  }, [id]);

  if (!book) 
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );

  const formattedDate = book.publishedDate 
    ? new Date(book.publishedDate).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "0 20px" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <h1 style={{ fontSize: "2em" }}>Book Details</h1>
          {book.imageLinks?.thumbnail && (
            <img src={book.imageLinks.thumbnail} alt={book.title} style={{ maxWidth: '100%', height: 'auto' }} />
          )}
          <h2 style={{ fontSize: "1.5em" }}>{book.title}</h2>
          <p style={{ fontSize: "1.1em" }}>
            <strong>Author:</strong> {book.authors?.join(", ") || "N/A"}
          </p>
          <p style={{ fontSize: "1.1em" }}>
            <strong>Description:</strong> {book.subtitle || "N/A"}
          </p>
          <p style={{ fontSize: "1.1em" }}>
            <strong>Published Date:</strong> {formattedDate}
          </p>
          <br />
          <a
            target="_blank"
            href={book.previewLink}
            rel="noopener noreferrer"
            style={{
              fontSize: "16px",
              color: "#1890ff",
            }}
          >
            Go to Google Books{" "}
            <img
              src="https://chlzslvdr.sirv.com/bookish/right-arrow.png"
              alt="Right Arrow"
              style={{ marginLeft: "5px", width: "16px", height: "16px" }}
            />
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default BookDetails;
