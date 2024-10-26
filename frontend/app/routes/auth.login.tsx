import { useForm } from "@mantine/form";
import { useNavigate } from "@remix-run/react";
import { useAtom } from "jotai";
import { useLogin } from "orval/client";
import type { LoginBody } from "orval/client.schemas";
import LoginFormComponent from "~/components/login/LoginFormComponent";
import { userAtom } from "~/stores/userAtom";
import { errorNotifications, successNotifications } from "~/utils/notification";

const LoginPage = () => {
  const loginTask = useLogin();
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const form = useForm<LoginBody>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+$/i.test(value)
          ? null
          : "有効でないメールアドレスです",
      password: (value) => {
        if (value.length < 8) return "パスワードは8文字以上で入力してください";
        else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(value)) return null;
        else return "パスワードにはアルファベットと数字を含めてください";
      },
    },
  });

  const handleSubmit = (props: LoginBody) => {
    loginTask.mutate(
      {
        data: props,
      },
      {
        onSuccess: (response) => {
          switch (response.status) {
            case 200:
              successNotifications("ログインに成功しました");
              setUser(response.data);
              navigate("/home/mypage");
              break;
            case 400:
              errorNotifications(
                "メールアドレスまたはパスワードが間違っています"
              );
              break;
            case 401:
              errorNotifications(
                "メールアドレスまたはパスワードが間違っています"
              );
              break;
            case 404:
              errorNotifications("ユーザーが見つかりません");
              break;
            case 500:
              errorNotifications("サーバーエラーが発生しました");
              break;
            default:
              errorNotifications("エラーが発生しました");
          }
        },
        onError: () => {
          errorNotifications(
            "APIに問題が発生しています。サーバが起動されているか確認してください。"
          );
        },
      }
    );
  };

  return (
    <LoginFormComponent
      isPending={loginTask.isPending}
      form={form}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
