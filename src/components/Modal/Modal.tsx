"use client";

import { ModalContext } from "@/app/providers/modal";
import { MouseEvent, useContext, useRef } from "react";

export function ModalTicket() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node))
      handleModalVisible();
  };

  return (
    <section
      onClick={handleModalClick}
      className='absolute w-full h-full flex justify-center items-center bg-black/50'
    >
      <div
        ref={modalRef}
        className='bg-white w-4/5 md:w-1/2 border rounded-xl shadow-lg flex flex-col p-4'
      >
        <div className='flex justify-between mb-4'>
          <h1 className='text-xl font-bold'>Detalhe do chamado</h1>
          <button
            onClick={handleModalVisible}
            className='py-1 px-4 bg-red-600 rounded text-white cursor-pointer hover:bg-red-400 duration-200'
          >
            Fechar
          </button>
        </div>

        <div className='flex flex-col gap-3'>
          <div>
            <span className='font-bold'>Nome: </span>
            <span>{ticket?.ticket.name}</span>
          </div>
          <div className='flex flex-col gap-1 border-b pb-4'>
            <span className='font-bold'>Descrição: </span>
            <span>{ticket?.ticket.description}</span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-lg pt-4'>Detalhe do cliente</h2>
          <div className='flex flex-col gap-1'>
            <div>
              <span className='font-bold'>Nome: </span>
              <span>{ticket?.customer?.name}</span>
            </div>
            <div>
              <span className='font-bold'>Telefone: </span>
              <span>{ticket?.customer?.phone}</span>
            </div>
            <div>
              <span className='font-bold'>Email: </span>
              <span>{ticket?.customer?.email}</span>
            </div>
            {ticket?.customer?.address && (
              <div>
                <span className='font-bold'>Endereço: </span>
                <span>{ticket?.customer?.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
