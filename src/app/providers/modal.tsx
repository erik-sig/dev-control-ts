"use client";

import { ModalTicket } from "@/components/Modal/Modal";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { ReactNode, createContext, useState } from "react";

interface ModalContextData {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailsTicket: (details: TicketInfo) => void;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible() {
    setVisible(!visible);
  }

  function setDetailsTicket(details: TicketInfo) {
    setTicket(details);
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailsTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
