import { Button, Modal, Text, TextInput, ThemeIcon } from "@mantine/core";
import { Pencil, Trash } from "lucide-react";
import EditForm from "../Form/EditForm";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../Slices/userSlice";
const ListOption = ({ user }) => {
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
    <div className="absolute inset-0 flex items-center justify-center gap-20 hover:opacity-1">
      <Modal opened={opened} onClose={close} title="Edit User Form">
        <EditForm userData={user} onClose={close} />
      </Modal>
      <ThemeIcon size="xl" className="cursor-pointer" onClick={open}>
        <Pencil />
      </ThemeIcon>

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
      <ThemeIcon
        size="xl"
        variant="gradient"
        gradient={{ from: "red", to: "red", deg: 90 }}
        className="cursor-pointer"
        onClick={open2}
      >
        <Trash />
      </ThemeIcon>
    </div>
  );
};

export default ListOption;
