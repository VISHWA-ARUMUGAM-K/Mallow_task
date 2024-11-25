import { Button, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditForm from "../Form/EditForm";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../Slices/userSlice";

const TableOption = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (confirmDelete == "deletion") {
      dispatch(deleteUser(user));
      close2();
    }
  };
  return (
    <div className="flex gap-3">
      <Modal opened={opened} onClose={close} title="Edit User Form">
        <EditForm userData={user} onClose={close}></EditForm>
      </Modal>
      <Button variant="gradient" onClick={open}>
        Edit
      </Button>
      <Modal
        opened={opened2}
        onClose={close2}
        title="Type the below for deletion"
      >
        <div className="flex flex-col gap-4 px-3">
          <Text c="red" fs="italic">
            deletion
          </Text>
          <TextInput
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
          />
          <Button
            variant="gradient"
            gradient={{ from: "red", to: "red", deg: 90 }}
            onClick={handleDelete}
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
      <Button
        onClick={open2}
        variant="gradient"
        gradient={{ from: "red", to: "red", deg: 90 }}
      >
        delete
      </Button>
    </div>
  );
};

export default TableOption;
