"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader, ArrowLeft } from "lucide-react";

export default function BikeDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    bikeModel: "",
    registrationNumber: "",
    engineNumber: "",
    chassisNumber: "",
    tokenTaxPaidUpTo: "",
  });

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await fetch("/api/documents/bike-details");
        const data = await res.json();
        if (data.data) {
          setFormData({
            bikeModel: data.data.bikeModel,
            registrationNumber: data.data.registrationNumber,
            engineNumber: data.data.engineNumber,
            chassisNumber: data.data.chassisNumber,
            tokenTaxPaidUpTo: data.data.tokenTaxPaidUpTo,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchExisting();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingRes = await fetch("/api/documents/bike-details");
      const existingData = await existingRes.json();
      const isUpdate = !!existingData.data;

      const response = await fetch("/api/documents/bike-details", {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isUpdate ? "Bike details updated successfully" : "Bike details saved successfully");
        router.push("/");
      } else {
        alert("Error saving bike details");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving bike details");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link href="/" className="text-blue-600 hover:text-blue-700">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bike Details</h1>
          <p className="text-gray-600">Add or update your bike information</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bike Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bike Model/ Name
            </label>
            <input
              type="text"
              name="bikeModel"
              value={formData.bikeModel}
              onChange={handleChange}
              placeholder="e.g., Yamaha YBR 125G"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Registration Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="e.g., LEV-26-1234"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Engine Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Engine Number
            </label>
            <input
              type="text"
              name="engineNumber"
              value={formData.engineNumber}
              onChange={handleChange}
              placeholder="Enter engine number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Chassis Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chassis Number
            </label>
            <input
              type="text"
              name="chassisNumber"
              value={formData.chassisNumber}
              onChange={handleChange}
              placeholder="Enter chassis number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Token Tax Paid Up To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token Tax Paid Up To
            </label>
            <input
              type="date"
              name="tokenTaxPaidUpTo"
              value={formData.tokenTaxPaidUpTo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? "Saving..." : "Save Bike Details"}
            </button>
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
