"use client";

import { z } from "zod";
import Container from "@/components/Container/Container";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input/Input";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar")
    .min(1, "Email obrigatório"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    api
      .get("/api/customer", {
        params: { email: data.email },
      })
      .then((response) => {
        const customer = {
          id: response.data.id,
          name: response.data.name,
        };
        setCustomer(customer);
      })
      .catch((error) => {
        setError("email", {
          type: "custom",
          message: "Ops, cliente não foi encontrado!",
        });
        return;
      });
  }

  return (
    <Container>
      <main className='mt-52 flex flex-col justify-center items-center gap-4'>
        <h1 className='text-4xl font-bold'>Abrir chamado</h1>
        {customer ? (
          <>
            <div className='bg-gray-200 p-6 w-5/6 sm:w-1/2 flex items-center justify-between rounded-lg'>
              <p className='flex gap-2 items-center'>
                <strong className='text-lg'>Cliente selecionado:</strong>
                {customer.name}
              </p>
              <button onClick={handleClearCustomer}>
                <FiX size={30} color='#e03e3e'></FiX>
              </button>
            </div>
            <FormTicket customer={customer} />
          </>
        ) : (
          <form
            onSubmit={handleSubmit(handleSearchCustomer)}
            className='bg-gray-200 p-6 w-3/5 sm:w-1/2 flex flex-col gap-2 rounded-lg'
          >
            <Input
              name='email'
              type='text'
              error={errors.email?.message}
              register={register}
              placeholder='Digite o email do cliente...'
            />
            <button className='font-bold flex justify-center items-center gap-3 mt-4 py-2 px-6 text-white bg-blue-500 rounded hover:bg-blue-400 duration-200'>
              Procurar clientes
              <FiSearch size={24} color='#fff'></FiSearch>
            </button>
          </form>
        )}
      </main>
    </Container>
  );
}
