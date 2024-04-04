"use client";

import { ModalContext } from "@/app/providers/modal";
import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiCheckSquare, FiFile, FiLoader } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketRow({ ticket, customer }: TicketItemProps) {
  const route = useRouter();
  const { handleModalVisible, setDetailsTicket } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      await api
        .patch("/api/ticket", {
          id: ticket.id,
        })
        .then(() => route.refresh());
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenModal() {
    setDetailsTicket({ ticket, customer });
    handleModalVisible();
  }

  return (
    <>
      <tr className='bg-gray-50 hover:bg-gray-200 duration-100 rounded border-b-2 text-sm h-16 last:border-b-0'>
        <th className='font-medium text-center border-l-2 border-black'>
          {customer?.name}
        </th>
        <th className='font-medium text-center border-l-2 border-black hidden h-max sm:table-cell'>
          {ticket.create_at?.toLocaleDateString("pt-br")}
        </th>
        <th className='font-medium text-center border-l-2 border-black'>
          <span className=' bg-green-500 text-black rounded py-1 px-3'>
            {ticket.status}
          </span>
        </th>
        <th className='font-medium text-center border-x-2 border-black'>
          <button
            className='mr-2 hover:scale-105 duration-100'
            onClick={handleChangeStatus}
          >
            <FiCheckSquare size={24} color='#43bd33'></FiCheckSquare>
          </button>
          <button
            className='hover:scale-105 duration-100'
            onClick={handleOpenModal}
          >
            <FiFile size={24} color='#3b82f6'></FiFile>
          </button>
        </th>
      </tr>
    </>
  );
}
