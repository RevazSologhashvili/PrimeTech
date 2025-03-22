"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAllServices } from "@/app/api/actions";

interface ServiceProps {
  id: number;
  title: string;
  description: string;
  serviceBaseType: "personal" | "business" | "enterprise";
  servicePriceOnsite?: number | null;
  servicePriceRemote?: number | null;
  imageHref: string;
}

export default function Items() {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetchAllServices();
        setServices(response);
      } catch (error) {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ჩვენი სერვისები</h1>

      {loading ? (
        <div className="text-center text-xl">იტვირთება...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Service Image */}
              <div className="w-full h-48 overflow-hidden">
                <Image
                  src={service.imageHref}
                  alt={service.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Service Details */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <div className="flex flex-col space-y-2 mb-4">
                  <p className="text-gray-800">
                    ფასი ადგილზე: <span className="font-semibold">{service.servicePriceOnsite ? service.servicePriceOnsite + " ₾" : "N/A"}</span>
                  </p>
                  <p className="text-gray-800">
                    ფასი დისტანციურად: <span className="font-semibold">{service.servicePriceRemote ? service.servicePriceRemote + " ₾" : "N/A"}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                    onClick={() => alert(`Viewing details for ${service.title}`)} // Placeholder action
                  >
                    დეტალები
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
                    onClick={() => alert(`Contacting about ${service.title}`)} // Placeholder action
                  >
                    დაკავშირება
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
