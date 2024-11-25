import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { LockKeyhole, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../store/authSlice";
import { useLoginUserMutation } from "./Slices/authApiSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();
  const formData = useSelector((state) => state.auth.formData);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await loginUser(data)
      .unwrap()
      .then((action) => {
        if (!action.token.length) return;
        localStorage.setItem("accessToken", action.token);
        navigate("/users");
        dispatch(setFormData({ email: data.email }));
      });
  };

  return (
    <div className="bg-custom-grey flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col justify-center gap-y-8 h-[300px] w-[500px] bg-white p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          leftSection={<User />}
          placeholder="Enter your Email"
          {...register("email")}
        />
        <PasswordInput
          leftSection={<LockKeyhole />}
          placeholder="Passoword"
          {...register("password")}
        />
        <Checkbox defaultChecked label="Remember me" />
        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
};

export default LoginForm;
