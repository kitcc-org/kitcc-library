import type { UseFormReturnType } from "@mantine/form";
import type { LoginBody } from "client/client.schemas";
import FormBaseLayout from "../layouts/FormBaseLayout";
import FormLayout from "../layouts/FormLayout";
import LoginEmailForm from "./LoginEmailForm";
import LoginFormHelpText from "./LoginFormHelpText";
import LoginFormTitle from "./LoginFormTitle";
import LoginPasswordForm from "./LoginPasswordForm";
import LoginSubmitButton from "./LoginSubmitButton";

interface LoginFormComponentProps {
  isPending: boolean;
  form: UseFormReturnType<LoginBody, (values: LoginBody) => LoginBody>;
  handleSubmit: (props: LoginBody) => void;
}

const LoginFormComponent = ({
  isPending,
  form,
  handleSubmit,
}: LoginFormComponentProps) => {
  return (
    <FormBaseLayout>
      <FormLayout<LoginBody> form={form} handleSubmit={handleSubmit}>
        <LoginFormTitle />
        <LoginEmailForm form={form} />
        <LoginPasswordForm form={form} />
        <LoginSubmitButton isPending={isPending} />
        <LoginFormHelpText />
      </FormLayout>
    </FormBaseLayout>
  );
};

export default LoginFormComponent;
