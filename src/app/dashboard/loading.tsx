import Container from "@/components/Container/Container";
import { FiLoader } from "react-icons/fi";

export default function DashboardLoading() {
  return (
    <Container>
      <div className='mt-20 w-full  flex justify-center items-center'>
        <span className='animate-spin'>
          <FiLoader size={30} color='#001'></FiLoader>
        </span>
      </div>
    </Container>
  );
}
