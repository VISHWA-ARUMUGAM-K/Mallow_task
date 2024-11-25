import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { LockKeyhole, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/authSlice";
import { useLoginUserMutation } from "./Slices/authApiSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "./utils/validation";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isError, error }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await loginUser(data)
      .unwrap()
      .then((action) => {
        if (!action.token.length) return;
        localStorage.setItem("accessToken", action.token);
        navigate("/users");
        dispatch(setFormData({ email: data.email }));
      })
      .catch(() => {
        if (isError) {
          setError("root", { message: error });
        }
      });
  };

  return (
    <div className="bg-custom-grey flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col justify-center gap-y-5 w-[500px] bg-white p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          leftSection={<User />}
          placeholder="Enter your Email"
          {...register("email", {
            required: "Email is required",
            validate: validateEmail,
          })}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <PasswordInput
          leftSection={<LockKeyhole />}
          placeholder="Password"
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 6,
              message: "Password must have atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <Checkbox defaultChecked label="Remember me" />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading" : "Login"}
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
