import Container from "@/components/Container/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CustomerContainer from "./components/CustomerContainer/CustomerContainer";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <CustomerContainer userId={session.user.id} />
    </Container>
  );
}
