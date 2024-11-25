import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import EditForm from "../Form/EditForm";
import DeleteForm from "../Form/DeleteForm";

const TableOption = ({ user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

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
        <DeleteForm user={user} close={close2} />
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
