"use client";

import { Input } from "@/components/Input/Input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CustomerFormSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "O email0 é obrigatório"),
  phone: z.string().refine(
    (value) => {
      return (
        /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
        /^\d{2}\s\d{9}$/.test(value) ||
        /^\d{11}$/.test(value)
      );
    },
    { message: "O número de telefone deve estar (DD) 999999999" }
  ),
  address: z.string(),
});

export type FormData = z.infer<typeof CustomerFormSchema>;

export function CustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CustomerFormSchema),
  });

  const router = useRouter();

  async function handleRegisterCustomer(data: FormData) {
    await api
      .post("/api/customer", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        userId: userId,
      })
      .then(() => {
        router.refresh();
        router.replace("/dashboard/customer");
        router.refresh();
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterCustomer)}
      className='flex flex-col my-8'
    >
      <div>
        <label className='mb-1 text-lg font-medium flex-1'>Nome completo</label>
        <Input
          type='text'
          name='name'
          placeholder='Digite o nome completo'
          error={errors.name?.message}
          register={register}
        />
      </div>
      <section className='flex flex-col gap-2 mt-4 sm:flex-row'>
        <div className='flex-1'>
          <label className='mb-1 text-lg font-medium'>Email</label>
          <Input
            type='email'
            name='email'
            placeholder='Digite o email'
            error={errors.email?.message}
            register={register}
          />
        </div>
        <div className='flex-1'>
          <label className='mb-1 text-lg font-medium'>Telefone</label>
          <Input
            type='text'
            name='phone'
            placeholder='Exemplo (DD) 999101900'
            error={errors.phone?.message}
            register={register}
          />
        </div>
      </section>
      <label className='mb-1 mt-4 text-lg font-medium flex-1'>
        Endereço completo
      </label>
      <Input
        type='text'
        name='address'
        placeholder='Digite o endereço do cliente'
        error={errors.address?.message}
        register={register}
      />
      <button
        type='submit'
        className='mt-4 py-2 px-6 text-white bg-blue-500 rounded hover:bg-blue-400 duration-200'
      >
        Cadastrar
      </button>
    </form>
  );
}
