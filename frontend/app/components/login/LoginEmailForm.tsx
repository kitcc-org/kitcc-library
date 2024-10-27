import { TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { LoginBody } from "client/client.schemas";

interface LoginEmailFormProps {
  form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>;
}

const LoginEmailForm = ({ form }: LoginEmailFormProps) => {
  return (
    <TextInput
      label="メールアドレス"
      withAsterisk
      autoComplete="email"
      key={form.key("email")}
      data-testid="email-input"
      {...form.getInputProps("email")}
    />
  );
};

export default LoginEmailForm;
