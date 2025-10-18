import { useState } from "react";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ConfirmationAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const navigate = useNavigate();

  // mutation for confirm account
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
      setToken("");
    },
    onSuccess: () => {
      toast.success("Cuenta confirmada exitosamente");

      // redirect to login page
      navigate("/auth/login");
    }
  });

  // function to update pin input value
  const handleChange = (value: ConfirmToken["token"]) => {
    setToken(value);
  };

  // function to handle complete pin input
  const handleComplete = (value: ConfirmToken["token"]) => {
    console.log("Pin completed:", value);

    mutate({ token: value });
  };

  return (
    <>
      <h1 className="text-3xl font-black mb-5 text-center text-white">
        Confirmar Cuenta
      </h1>

      <form
        className="bg-white w-full p-5 rounded flex flex-col gap-5"
        noValidate
      >
        <p className="text-center">
          Ingresa el código de 6 dígitos enviado a tu correo electrónico.
        </p>

        <div className="flex justify-center gap-2">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <PinInputField
                key={i}
                className="w-10 rounded border border-gray-200 placeholder-white text-center p-2"
              />
            ))}
          </PinInput>
        </div>
      </form>
    </>
  );
}
