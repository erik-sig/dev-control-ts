import Container from "@/components/Container/Container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className='mt-10 flex flex-col'>
        <div className='flex justify-start items-center gap-3'>
          <Link href='/dashboard'>
            <button className='bg-black text-white px-4 py-1 rounded'>
              Voltar
            </button>
          </Link>
          <h1 className='text-3xl text-black font-bold'>Novo chamado</h1>
        </div>
        <form
          className='flex flex-col my-8 gap-4'
          action={handleRegisterTicket}
        >
          <div>
            <label className='mb-1 text-lg font-medium flex-1'>
              Nome do chamado
            </label>
            <input
              className='w-full border-2 rounded-md h-11 px-2 outline-none'
              type='text'
              placeholder='Digite o nome...'
              name='name'
            />
          </div>

          <div>
            <label className='mb-1 text-lg font-medium'>
              Descreva o problema
            </label>
            <textarea
              className='w-full border-2 rounded-md h-24 px-2 outline-none resize-none'
              placeholder='Descreva o problema...'
              required
              name='description'
            />
          </div>
          <div>
            {customers.length !== 0 && (
              <>
                <label className='mb-1 text-lg font-medium'>
                  Selecione seu cliente
                </label>
                <select
                  className='w-full border-2 rounded-md h-11 px-2 outline-none'
                  name='customer'
                >
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </>
            )}
            {customers.length === 0 && (
              <>
                <span>Você não pode criar chamado se não tiver clientes, </span>
                <Link href='/dashboard/customer/new'>
                  <span className='text-blue-500 font-bold hover:text-blue-400 duration-200'>
                    cadastre agora!
                  </span>
                </Link>
              </>
            )}
          </div>

          <Suspense fallback={<span>LOADING</span>}>
            <button
              type='submit'
              className='mt-4 py-2 px-6 text-white bg-blue-500 rounded hover:bg-blue-400 duration-200 disabled:cursor-not-allowed disabled:bg-blue-300'
              disabled={customers.length === 0}
            >
              Cadastrar
            </button>
          </Suspense>
        </form>
      </main>
    </Container>
  );
}
