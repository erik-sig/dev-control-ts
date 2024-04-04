import { Button } from "@/components/Button/Button";
import { CustomerCard } from "../CustomerCard/CustomerCard";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function CustomerContainer({
  userId,
}: {
  userId: string;
}) {
  const customers = await prisma.customer.findMany({
    where: { userId },
  });

  return (
    <main className='mt-10 flex flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl text-black font-bold'>Meus clientes</h1>
        <Link href='/dashboard/customer/new'>
          <Button text='Novo cliente'></Button>
        </Link>
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
        {customers.map((customer) => (
          <CustomerCard customer={customer} key={customer.id} />
        ))}
        {customers.length === 0 && (
          <span>Você não possui nenhum cliente...</span>
        )}
      </section>
    </main>
  );
}
