import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface BookInfo {
  title: string;
  authors?: string[];
  publisher?: string;
}

const BookDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the book ID from the query
  const [book, setBook] = useState<BookInfo | null>(null); // Use the BookInfo type for state

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
          );

          setBook(response.data.volumeInfo);
        } catch (error) {
          console.error("Error fetching book details:", error);
        }
      };
      fetchBookDetails();
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Book Details</h1>
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.authors?.join(", ") || "N/A"}
      </p>
      <p>
        <strong>Publisher:</strong> {book.publisher || "N/A"}
      </p>
    </div>
  );
};

export default BookDetails;
