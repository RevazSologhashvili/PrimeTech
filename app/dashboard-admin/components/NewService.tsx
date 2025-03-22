"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after successful submission
import { UploadButton } from "@/app/utils/uploadthing"; // Assuming UploadButton component
import Image from "next/image";

export default function NewServisePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceBaseType, setServiceBaseType] = useState("personal"); // Default type
  const [servicePriceOnsite, setServicePriceOnsite] = useState("");
  const [servicePriceRemote, setServicePriceRemote] = useState("");
  const [imageHref, setImageHref] = useState(""); // To store image URL
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter(); // For redirecting after successful creation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    const newService = {
      title,
      description,
      serviceBaseType,
      servicePriceOnsite: parseInt(servicePriceOnsite, 10),
      servicePriceRemote: parseInt(servicePriceRemote, 10),
      imageHref, // Add image URL to the service data
    };

    try {
      // Sending data to the API route to create the new service
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error("Failed to create service");
      }

      const service = await response.json();
      setSuccessMessage("Service created successfully!");
      router.push("/dashboard-admin"); // Redirect to the dashboard or another page
    } catch (err) {
      setError("Failed to create service");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload and set the image URL
  const handleImageUploadComplete = (res: any) => {
    if (res?.[0]) {
      setImageHref(res[0].url); // Set the uploaded image URL
      console.log("Image uploaded:", res);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">ახალი სერვისის დამატება</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Service Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="serviceBaseType" className="block text-sm font-medium text-gray-700">
            Service Base Type
          </label>
          <select
            id="serviceBaseType"
            value={serviceBaseType}
            onChange={(e) => setServiceBaseType(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div>
          <label htmlFor="servicePriceOnsite" className="block text-sm font-medium text-gray-700">
            Service Price Onsite
          </label>
          <input
            type="number"
            id="servicePriceOnsite"
            value={servicePriceOnsite}
            onChange={(e) => setServicePriceOnsite(e.target.value)}
            disabled={serviceBaseType === "enterprise"}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="servicePriceRemote" className="block text-sm font-medium text-gray-700">
            Service Price Remote
          </label>
          <input
            type="number"
            id="servicePriceRemote"
            value={servicePriceRemote}
            onChange={(e) => setServicePriceRemote(e.target.value)}
            disabled={serviceBaseType === "enterprise"}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          
          {/* Conditionally render image or upload button */}
          {imageHref ? (
            <div className="mt-2">
              <Image
                src={imageHref}
                width={200}
                height={200}
                alt="Uploaded Image"
                className=" rounded-md border border-gray-300"
              />
            </div>
          ) : (
            <UploadButton
              endpoint="imageUploader" // Adjust the endpoint name as needed
              onClientUploadComplete={handleImageUploadComplete} // Handle the image upload completion
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`); // Handle upload errors
              }}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isLoading ? "Creating..." : "Create Service"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
    </div>
  );
}
