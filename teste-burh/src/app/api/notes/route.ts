import client from "@/lib/prisma/client";
import { notes } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const newNote: notes = await request.json();
  const createdNote: notes = await client.notes.create({
    data: newNote,
  });

  return new NextResponse(JSON.stringify(createdNote), {
    status: 201,
    statusText: "Created",
  });
}

export async function GET() {
  const notes: notes[] = await client.notes.findMany();

  return new NextResponse(JSON.stringify(notes), {
    status: 200,
    statusText: "OK",
  });
}
