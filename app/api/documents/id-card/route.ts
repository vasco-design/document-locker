import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET single ID Card
export async function GET() {
  try {
    const idCard = await prisma.idCard.findFirst();
    return NextResponse.json({ data: idCard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ID Card:", error);
    return NextResponse.json(
      { error: "Failed to fetch ID Card" },
      { status: 500 }
    );
  }
}

// POST create ID Card
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Delete existing if any
    await prisma.idCard.deleteMany();

    const idCard = await prisma.idCard.create({
      data: {
        fullName: body.fullName,
        idNumber: body.idNumber,
        dateOfBirth: body.dateOfBirth,
        issueDate: body.issueDate,
        expiryDate: body.expiryDate,
        frontImage: body.frontImage || null,
        backImage: body.backImage || null,
      },
    });

    return NextResponse.json({ data: idCard }, { status: 201 });
  } catch (error) {
    console.error("Error creating ID Card:", error);
    return NextResponse.json(
      { error: "Failed to create ID Card" },
      { status: 500 }
    );
  }
}

// PUT update ID Card
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const existingCard = await prisma.idCard.findFirst();

    if (!existingCard) {
      return NextResponse.json(
        { error: "ID Card not found" },
        { status: 404 }
      );
    }

    const updatedCard = await prisma.idCard.update({
      where: { id: existingCard.id },
      data: {
        fullName: body.fullName,
        idNumber: body.idNumber,
        dateOfBirth: body.dateOfBirth,
        issueDate: body.issueDate,
        expiryDate: body.expiryDate,
        frontImage: body.frontImage || existingCard.frontImage,
        backImage: body.backImage || existingCard.backImage,
      },
    });

    return NextResponse.json({ data: updatedCard }, { status: 200 });
  } catch (error) {
    console.error("Error updating ID Card:", error);
    return NextResponse.json(
      { error: "Failed to update ID Card" },
      { status: 500 }
    );
  }
}
