import Container from "@/components/Container/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CustomerForm } from "../components/CustomerForm/CustomerForm";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className='mt-10 flex flex-col'>
        <div className='flex justify-start items-center gap-3'>
          <Link href='/dashboard/customer'>
            <button className='bg-black text-white px-4 py-1 rounded'>
              Voltar
            </button>
          </Link>
          <h1 className='text-3xl text-black font-bold'>Novo cliente</h1>
        </div>
        <div>
          <CustomerForm userId={session.user.id} />
        </div>
      </main>
    </Container>
  );
}
