import { useMutation } from "@tanstack/react-query";
import { ConfirmToken } from "@/types/index";
import { validateToken } from "@/api/AuthAPI";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import toast from "react-hot-toast";

type NewPasswordTokenProps = {
  token: ConfirmToken["token"];
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsValidToken?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken = () => {}
}: NewPasswordTokenProps) {
  // Mutation for validating token
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data, variables) => {
      toast.success(data);

      // Set token to show the new password form
      setToken(variables.token);
      console.log("Token: ", variables.token);

      // Set isValidToken to show the new password form
      setIsValidToken(true);
    }
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => {
    console.log(token);

    // Call the mutation to validate the token
    mutate({ token });
  };

  return (
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
              className="w-10 rounded border placeholder-white text-black text-center p-2"
            />
          ))}
        </PinInput>
      </div>
    </form>
  );
}
