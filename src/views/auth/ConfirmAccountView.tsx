import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import toast from "react-hot-toast";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  // mutation for confirm account
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
      //setToken("");
    },
    onSuccess: () => {
      toast.success("Cuenta confirmada exitosamente");
    },
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
                className="w-10 rounded border placeholder-white text-center p-2"
              />
            ))}
          </PinInput>
        </div>

        {/* <div className="mt-5">
          <Link to="/login" className="btn w-full text-center">
            Solicitar Nuevo Código
          </Link>
        </div> */}
      </form>
    </>
  );
}
