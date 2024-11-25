import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as genId } from "uuid";
import { updateUser } from "../Slices/userSlice";

const EditForm = ({ userData, onClose }) => {
  const { register, handleSubmit } = useForm({ defaultValues: userData });

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updateUser(data));
    onClose();
  };

  const HandleCancel = () => {
    onClose();
  };
  return (
    <form
      className="flex flex-col justify-between gap-20 px-3 pb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 ">
        <TextInput
          label="First Name"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("first_name")}
        />
        <TextInput
          label="Last Name"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("last_name")}
        />
        <TextInput
          label="Email"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("email")}
        />
        <TextInput
          label="Profile Image Link"
          withAsterisk
          placeholder="Please enter your first name"
          {...register("avatar")}
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="default" onClick={HandleCancel}>
          Cancel
        </Button>
        <Button variant="gradient" type="submit">
          submit
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
