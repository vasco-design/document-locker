import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET single Driving License
export async function GET() {
  try {
    const license = await prisma.drivingLicense.findFirst();
    return NextResponse.json({ data: license }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Driving License:", error);
    return NextResponse.json(
      { error: "Failed to fetch Driving License" },
      { status: 500 }
    );
  }
}

// POST create Driving License
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Delete existing if any
    await prisma.drivingLicense.deleteMany();

    const license = await prisma.drivingLicense.create({
      data: {
        licenseNumber: body.licenseNumber,
        category: body.category,
        issueDate: body.issueDate,
        expiryDate: body.expiryDate,
        licensingAuthority: body.licensingAuthority,
      },
    });

    return NextResponse.json({ data: license }, { status: 201 });
  } catch (error) {
    console.error("Error creating Driving License:", error);
    return NextResponse.json(
      { error: "Failed to create Driving License" },
      { status: 500 }
    );
  }
}

// PUT update Driving License
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existingLicense = await prisma.drivingLicense.findFirst();

    if (!existingLicense) {
      return NextResponse.json(
        { error: "Driving License not found" },
        { status: 404 }
      );
    }

    const updatedLicense = await prisma.drivingLicense.update({
      where: { id: existingLicense.id },
      data: {
        licenseNumber: body.licenseNumber,
        category: body.category,
        issueDate: body.issueDate,
        expiryDate: body.expiryDate,
        licensingAuthority: body.licensingAuthority,
      },
    });

    return NextResponse.json({ data: updatedLicense }, { status: 200 });
  } catch (error) {
    console.error("Error updating Driving License:", error);
    return NextResponse.json(
      { error: "Failed to update Driving License" },
      { status: 500 }
    );
  }
}
