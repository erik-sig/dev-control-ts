export interface CustomerProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string | null;
  create_at: Date | null;
  update_at: Date | null;
  userId: string | null;
}
