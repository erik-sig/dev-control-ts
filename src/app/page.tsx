import Image from "next/image";

import heroImg from "@/assets/hero.svg";
import Container from "@/components/Container/Container";

export default function Home() {
  return (
    <Container>
      <main className='min-h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-3 text-center '>
        <h2 className='text-3xl font-medium'>Gerencie sua empresa</h2>
        <h1 className='text-5xl text-blue-800 font-bold'>
          Atendimentos, Clientes
        </h1>
        <Image
          src={heroImg}
          alt='Imagem da empresa DevControl'
          quality={100}
          priority
          width={600}
          className='max-w-sm md:max-w-2xl mt-10'
        ></Image>
      </main>
    </Container>
  );
}
