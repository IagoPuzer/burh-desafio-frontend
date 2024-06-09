import client from "@/lib/prisma/client";
import { notes } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

type FindById = {
  id: string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
  try {
    const note: notes | null = await client.notes.findUnique({
      where: {
        id: Number(context.params.id),
      },
    });

    if (!note) {
      return new NextResponse(
        JSON.stringify({ message: "Nota não encontrada" }),
        {
          status: 404,
          statusText: "Not Found",
        }
      );
    }

    return new NextResponse(JSON.stringify(note), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.error("Erro ao buscar a nota:", error);

    return new NextResponse(
      JSON.stringify({ message: "Ocorreu um erro ao buscar a nota" }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}

export async function PUT(request: NextRequest, context: { params: FindById }) {
  const newData = await request.json();

  try {
    const updatedNote = await client.notes.update({
      where: {
        id: Number(context.params.id),
      },
      data: newData,
    });

    return new NextResponse(JSON.stringify(updatedNote), {
      status: 200,
      statusText: "OK",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar a nota:", error);

    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: FindById }
) {
  try {
    await client.notes.delete({
      where: {
        id: Number(context.params.id), // Mantendo o ID como string
      },
    });

    return new NextResponse(null, {
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    console.error("Erro ao excluir a nota:", error);

    return new NextResponse(
      JSON.stringify({ message: "Ocorreu um erro ao excluir a nota" }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
