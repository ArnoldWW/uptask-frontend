import { RequestConfirmationCodeForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestNewConfirmationToken } from "@/api/AuthAPI";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

export default function NewTokenView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: ""
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData);
    reset();
  };

  // mutation for requesting a new confirmation token
  const { mutate } = useMutation({
    mutationFn: requestNewConfirmationToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    }
  });

  return (
    <>
      <h1 className="text-3xl font-black mb-5 text-center text-white">
        Solicitar Código de Confirmación
      </h1>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="bg-white w-full p-5 rounded flex flex-col gap-5"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full input"
            {...register("email", {
              required: "El correo electronico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <button type="submit" className="btn w-full">
          Enviar
        </button>
      </form>
    </>
  );
}
