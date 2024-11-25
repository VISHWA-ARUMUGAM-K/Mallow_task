import { Avatar, Button, Table } from "@mantine/core";
import TableOption from "./TableOption";
const TableView = ({
  users,
  currentPage,
  handlePageChange,
  pageNumbers,
  totalPages,
}) => {
  const rows = users().map((user) => (
    <Table.Tr key={user?.id}>
      <Table.Td>
        <Avatar src={user.avatar} />
      </Table.Td>
      <Table.Td className="text-blue-500">{user.email}</Table.Td>
      <Table.Td>{user.first_name}</Table.Td>
      <Table.Td>{user.last_name}</Table.Td>

      <Table.Td>
        <TableOption user={user} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table verticalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>FirstName</Table.Th>
            <Table.Th>LastName</Table.Th>
            <Table.Th>Options</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <div className="flex gap-3 justify-end">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>

        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </Button>
        ))}

        <Button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default TableView;
