import { Button } from "@/components/Button/Button";
import { TicketRow } from "../Ticket/Ticket";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function CallsContainer() {
  const session = await getServerSession(authOptions);

  const tickets = await prisma.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session?.user.id,
      },
    },
    include: {
      customer: true,
    },
  });

  return (
    <main className='mt-10 flex flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl text-black font-bold'>Chamados</h1>
        <Link href='/dashboard/new'>
          <Button text='Cadastrar' />
        </Link>
      </div>
      {tickets.length === 0 && (
        <span className='my-8'>Sem chamados no momento...</span>
      )}
      {tickets.length !== 0 && (
        <table className='min-w-full my-8'>
          <thead>
            <tr>
              <th className='font-medium text-center border-l-2 border-black'>
                CLIENTE
              </th>
              <th className='font-medium text-center border-l-2 border-black hidden sm:table-cell'>
                DATA CADASTRO
              </th>
              <th className='font-medium text-center border-l-2 border-black'>
                STATUS
              </th>
              <th className='font-medium text-center border-x-2 border-black'>
                AÇÕES
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
