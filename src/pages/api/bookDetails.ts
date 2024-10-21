import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const bookDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid book ID" });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );

    if (response.status === 200) {
      res.status(200).json(response.data.volumeInfo);
    } else {
      res.status(response.status).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
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

export default bookDetails;
