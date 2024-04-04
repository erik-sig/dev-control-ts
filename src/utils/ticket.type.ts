export interface TicketProps {
  id: string;
  name: string;
  description: string;
  status: string;
  create_at: Date | null;
  update_at: Date | null;
  userId: string | null;
}
