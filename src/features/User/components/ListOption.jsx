import { Modal, ThemeIcon } from "@mantine/core";
import { Pencil, Trash } from "lucide-react";
import EditForm from "../Form/EditForm";
import { useDisclosure } from "@mantine/hooks";
import DeleteForm from "../Form/DeleteForm";
const ListOption = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

  return (
    <div className=" hidden group-hover:flex absolute inset-0  items-center justify-center gap-20 hover:bg-gray-300 hover:bg-opacity-35">
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
        <DeleteForm user={user} close={close2} />
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
