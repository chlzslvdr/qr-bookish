import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const fetchBookInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Invalid query parameter" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );

    if (response.data.items && response.data.items.length > 0) {
      const book = response.data.items[0];
      const bookId = book.id;
      const bookDetails = {
        id: bookId,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(", ") || "N/A",
        publisher: book.volumeInfo.publisher || "N/A",
      };

      const bookUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/book/${bookId}`;
      res.status(200).json({ bookDetails, bookUrl });
    } else {
      res.status(404).json({ error: "No books found" });
    }
  } catch (error) {
    console.error("Error fetching book info:", error);
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error:
          error.response?.data?.error?.message ||
          "An error occurred while fetching book information",
      });
    } else {
      res.status(500).json({ error: "An error occurred on the server" });
    }
  }
};

export default fetchBookInfo;
