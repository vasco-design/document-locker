"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import DocumentCard from "@/components/DocumentCard";
import { IdCardIcon, DrivingLicenseIcon, BikeIcon } from "@/components/Icons";

export default function Dashboard() {
  const [data, setData] = useState<any>({
    idCard: null,
    drivingLicense: null,
    bikeDetails: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [idRes, licRes, bikeRes] = await Promise.all([
          fetch("/api/documents/id-card"),
          fetch("/api/documents/driving-license"),
          fetch("/api/documents/bike-details"),
        ]);

        const idData = await idRes.json();
        const licData = await licRes.json();
        const bikeData = await bikeRes.json();

        setData({
          idCard: idData.data || null,
          drivingLicense: licData.data || null,
          bikeDetails: bikeData.data || null,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          📄 Document Locker
        </h1>
        <p className="text-gray-600">
          Securely store and manage your important documents
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ID Card */}
        <DocumentCard
          icon={<IdCardIcon />}
          title="National ID Card"
          data={data.idCard}
          editLink="/documents/id-card"
          fields={
            data.idCard
              ? [
                  { label: "Name", value: data.idCard.fullName },
                  { label: "ID Number", value: data.idCard.idNumber },
                  { label: "Expiry", value: data.idCard.expiryDate },
                ]
              : []
          }
        />

        {/* Driving License */}
        <DocumentCard
          icon={<DrivingLicenseIcon />}
          title="Driving License"
          data={data.drivingLicense}
          editLink="/documents/driving-license"
          fields={
            data.drivingLicense
              ? [
                  { label: "License #", value: data.drivingLicense.licenseNumber },
                  { label: "Category", value: data.drivingLicense.category },
                  { label: "Expiry", value: data.drivingLicense.expiryDate },
                ]
              : []
          }
        />

        {/* Bike Details */}
        <DocumentCard
          icon={<BikeIcon />}
          title="Bike Details"
          data={data.bikeDetails}
          editLink="/documents/bike-details"
          fields={
            data.bikeDetails
              ? [
                  { label: "Model", value: data.bikeDetails.bikeModel },
                  {
                    label: "Registration",
                    value: data.bikeDetails.registrationNumber,
                  },
                  { label: "Token Tax", value: data.bikeDetails.tokenTaxPaidUpTo },
                ]
              : []
          }
        />
      </div>

      {/* Empty State */}
      {!data.idCard && !data.drivingLicense && !data.bikeDetails && (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No documents added yet</p>
          <Link
            href="/documents/id-card"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Your First Document
          </Link>
        </div>
      )}
    </div>
  );
}
