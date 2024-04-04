"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function CustomerCard({ customer }: { customer: CustomerProps }) {
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      await api
        .delete("/api/customer", {
          params: {
            id: customer.id,
          },
        })
        .then(() => {
          router.refresh();
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='bg-gray-100 w-full p-3 flex flex-col justify-center items-start rounded-lg gap-3 hover:scale-105 duration-200'>
      <div className='flex justify-start items-center gap-2'>
        <span className='font-bold'>Nome:</span>
        <span>{customer.name}</span>
      </div>
      <div className='flex justify-start items-center gap-2'>
        <span className='font-bold'>Email: </span>
        <span>{customer.email}</span>
      </div>
      <div className='flex justify-start items-center gap-2'>
        <span className='font-bold'>Telefone: </span>
        <span>{customer.phone}</span>
      </div>
      <button
        onClick={handleDeleteCustomer}
        className='px-4 py-0.5 text-sm bg-red-600 text-white rounded-md'
      >
        Deletar
      </button>
    </div>
  );
}
