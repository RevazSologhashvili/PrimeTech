"use client";
import { fetchAllServices, deleteService } from "@/app/api/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { handleImageDelete } from "@/app/api/deleteImage";
import Link from "next/link";


interface ServiceProps {
  id?: number;
  title: string;
  description: string;
  serviceBaseType: "personal" | "business" | "enterprise";
  servicePriceOnsite?: number | null;
  servicePriceRemote?: number | null;
  isRemote?: boolean;
  imageHref: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);  // Flag to ensure client-side only rendering


  // If no session, redirect to login page
  useEffect(() => {
    setIsClient(true); // Set to true after the first render on the client
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const services = await fetchAllServices();
        setData(services);
      } catch (error) {
        console.log(error);
        setError("Failed to get services");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Avoid hydration issues by not rendering until the component is mounted on the client
  if (!isClient) return null; // Or you could return a loading spinner if preferred

  const handleDelete = async (id: number, imageHref: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this service?");
    if (!confirmed) return;

    try {
      // First, delete the image from Uploadthing
      await handleImageDelete(imageHref);

      // Delete the service from the database or backend
      await deleteService(id);

      // Refresh the service list after deletion
      setData(data.filter((service) => service.id !== id));
    } catch (error) {
      setError("Failed to delete the service");
    }
  };

  const handleEdit = (id: number) => {
    // Implement edit logic here
    console.log(`Edit service with id: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">მიმდინარე სერვისები</h1>

      {loading && <p className="text-center">იტვირთება...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="my-5">
        <Link href={"/dashboard-admin/axaliServisi"} className="p-2 bg-orange-400 hover:bg-orange-500 rounded-lg text-white">
          ახალი სერვისი
        </Link>
      </div>

      {/* Table for displaying services */}
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price Onsite</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price Remote</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-800">{service.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.serviceBaseType}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {service.servicePriceOnsite ? `${service.servicePriceOnsite} ₾` : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {service.servicePriceRemote ? `${service.servicePriceRemote} ₾` : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Image src={service.imageHref} alt="Service image" width={80} height={80} className="rounded-md" />
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleEdit(service.id!)} className="mr-2 text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(service.id!, service.imageHref)} className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2>ამჟამად არცერთი სერვისი არ არის დამატებული</h2>
        </div>
      )}
    </div>
  );
}
