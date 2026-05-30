import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET single Bike Details
export async function GET() {
  try {
    const bike = await prisma.bikeDetails.findFirst();
    return NextResponse.json({ data: bike }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Bike Details:", error);
    return NextResponse.json(
      { error: "Failed to fetch Bike Details" },
      { status: 500 }
    );
  }
}

// POST create Bike Details
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Delete existing if any
    await prisma.bikeDetails.deleteMany();

    const bike = await prisma.bikeDetails.create({
      data: {
        bikeModel: body.bikeModel,
        registrationNumber: body.registrationNumber,
        engineNumber: body.engineNumber,
        chassisNumber: body.chassisNumber,
        tokenTaxPaidUpTo: body.tokenTaxPaidUpTo,
      },
    });

    return NextResponse.json({ data: bike }, { status: 201 });
  } catch (error) {
    console.error("Error creating Bike Details:", error);
    return NextResponse.json(
      { error: "Failed to create Bike Details" },
      { status: 500 }
    );
  }
}

// PUT update Bike Details
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existingBike = await prisma.bikeDetails.findFirst();

    if (!existingBike) {
      return NextResponse.json(
        { error: "Bike Details not found" },
        { status: 404 }
      );
    }

    const updatedBike = await prisma.bikeDetails.update({
      where: { id: existingBike.id },
      data: {
        bikeModel: body.bikeModel,
        registrationNumber: body.registrationNumber,
        engineNumber: body.engineNumber,
        chassisNumber: body.chassisNumber,
        tokenTaxPaidUpTo: body.tokenTaxPaidUpTo,
      },
    });

    return NextResponse.json({ data: updatedBike }, { status: 200 });
  } catch (error) {
    console.error("Error updating Bike Details:", error);
    return NextResponse.json(
      { error: "Failed to update Bike Details" },
      { status: 500 }
    );
  }
}
