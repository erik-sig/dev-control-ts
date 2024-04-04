import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { customerId, name, description } = await req.json();

  if (!customerId || !name || !description)
    return NextResponse.json(
      { message: "Failed create new ticket" },
      { status: 400 }
    );

  try {
    await prisma.ticket.create({
      data: {
        name,
        description,
        status: "ABERTO",
        customerId,
      },
    });
    return NextResponse.json({ message: "Chamado criado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed create new ticket" },
      { status: 400 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const { id } = await req.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket)
    return NextResponse.json(
      { error: "Failed update ticket" },
      { status: 400 }
    );

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "Chamado atualizado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed update ticket" },
      { status: 400 }
    );
  }
}
