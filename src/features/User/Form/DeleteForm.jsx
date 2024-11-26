import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteUser } from "../Slices/userSlice";
import { Button, Text, TextInput } from "@mantine/core";

const DeleteForm = ({ user, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(user));
    close();
  };
  return (
    <form
      className="flex flex-col gap-4 px-3"
      onSubmit={handleSubmit(handleDelete)}
    >
      <Text c="red" fs="italic">
        deletion
      </Text>
      <TextInput
        data-autofocus
        {...register("confirmDelete", {
          required: "Need confirmation word",
          validate: (value) => {
            if (!value === "deletion") {
              return "Invalid Text";
            }
            return;
          },
        })}
      />
      {errors.confirmDelete && (
        <div className="text-red-500">{errors.confirmDelete.message}</div>
      )}
      <Button
        variant="gradient"
        gradient={{ from: "red", to: "red", deg: 90 }}
        type="submit"
        onClick={handleSubmit(handleDelete)}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Confirm Delete
      </Button>
    </form>
  );
};

export default DeleteForm;
