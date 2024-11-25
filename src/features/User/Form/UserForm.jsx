/* eslint-disable react/prop-types */
import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as genId } from "uuid";
import { createUser } from "../Slices/userSlice";
import {
  validateEmail,
  validateName,
  validateURL,
} from "../../../utils/commonValidations";

const UserForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const newUser = { ...data, id: genId() };
    dispatch(createUser(newUser));
    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <form
      className="flex flex-col justify-between gap-20 px-3 pb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1">
        <TextInput
          label="First Name"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("first_name", {
            required: "First name is required",
            validate: validateName,
          })}
        />
        {errors.first_name && (
          <div className="text-red-500">{errors.first_name.message}</div>
        )}
        <TextInput
          label="Last Name"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("last_name", {
            required: "Last name is required",
            validate: validateName,
          })}
        />
        {errors.last_name && (
          <div className="text-red-500">{errors.last_name.message}</div>
        )}
        <TextInput
          label="Email"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("email", {
            required: "Email is required",
            validate: validateEmail,
          })}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
        <TextInput
          label="Profile Image Link"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("avatar", {
            required: "Avatar is required",
            validate: validateURL,
          })}
        />
        {errors.avatar && (
          <div className="text-red-500">{errors.avatar.message}</div>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="gradient" type="submit" disabled={isSubmitting}>
          submit
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
