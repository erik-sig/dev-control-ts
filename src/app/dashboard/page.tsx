import Container from "@/components/Container/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CallsContainer } from "./components/CallsContainer/CallsContainer";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <CallsContainer></CallsContainer>
    </Container>
  );
}
