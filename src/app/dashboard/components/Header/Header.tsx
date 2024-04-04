import Container from "@/components/Container/Container";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <Container>
      <header className='bg-slate-900 p-4 text-white rounded-xl mt-10 flex justify-start items-center gap-8 '>
        <Link
          className='duration-200 hover:scale-105 hover:font-bold'
          href='/dashboard'
        >
          Chamados
        </Link>
        <Link
          className='duration-200 hover:scale-105 hover:font-bold'
          href='/dashboard/customer'
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
}
