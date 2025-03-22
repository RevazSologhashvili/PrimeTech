"use server"
import { UTApi } from "uploadthing/server";

// Extract file ID from the full URL and delete it
export const handleImageDelete = async (href: string) => {
  try {
    const fileId = href.split('/').pop();  // Extract the file ID from the URL

    if (!fileId) {
      throw new Error("Invalid URL: File ID not found");
    }

    const utapi = new UTApi();

    // Delete the file using the file ID (not the full URL)
    await utapi.deleteFiles(fileId);
    
    console.log('Image deleted successfully!');
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
