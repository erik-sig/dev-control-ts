import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: customerEmail,
      },
    });
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 });
  }
}

//ROTA PARA CADASTRO DE CLIENTE
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const { name, email, phone, address, userId } = await req.json();

  try {
    await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address: address ? address : "",
        userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso" });
  } catch (err) {
    return NextResponse.json(
      { error: "failed to create new customer" },
      { status: 400 }
    );
  }
}

//ROTA PARA DELETAR CLIENTE
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);

  const customerId = searchParams.get("id");

  try {
    await prisma.customer.delete({
      where: {
        id: customerId as string,
      },
    });
    return NextResponse.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed delete customer" },
      { status: 400 }
    );
  }
}
