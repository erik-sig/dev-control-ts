import { Input } from "@/components/Input/Input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function FormTicket({ customer }: { customer: CustomerDataInfo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisteTicket(data: FormData) {
    await api
      .post("/api/ticket", {
        name: data.name,
        description: data.description,
        customerId: customer.id,
      })
      .then(() => reset());
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisteTicket)}
      className='bg-gray-200 px-6 py-4 w-5/6  sm:w-1/2 flex flex-col gap-2 rounded-lg'
    >
      <label className='mb-1 text-lg font-medium'>Nome do chamado: </label>
      <Input
        name='name'
        type='text'
        error={errors.name?.message}
        register={register}
        placeholder='Digite o nome do chamado...'
      />
      <label className='mb-1 text-lg font-medium'>Descreva o chamado: </label>
      <textarea
        className='pt-2 w-full border-2 rounded-md h-24 px-2 outline-none resize-none'
        placeholder='Descreva o seu problema...'
        {...register("description")}
        id='description'
      ></textarea>
      {errors.description?.message && (
        <span className='text-red-500'>{errors.description.message}</span>
      )}

      <button
        type='submit'
        className='font-bold flex justify-center items-center gap-3 mt-4 py-2 px-6 text-white bg-blue-500 rounded hover:bg-blue-400 duration-200'
      >
        Cadastrar
      </button>
    </form>
  );
}
