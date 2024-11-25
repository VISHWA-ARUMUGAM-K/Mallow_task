import { Avatar, Button, Paper, Text } from "@mantine/core";
import React, { useState } from "react";
import ListOption from "./ListOption";
const ListView = ({
  users,
  currentPage,
  handlePageChange,
  pageNumbers,
  totalPages,
}) => {
  const [hoveredId, setHoveredId] = useState(null);
  return (
    <div className="flex gap-9 flex-col">
      <div className="flex gap-5 flex-wrap">
        {users().map((user) => {
          return (
            <Paper
              radius="md"
              withBorder
              p="lg"
              bg="var(--mantine-color-body)"
              className="relative h-min flex-1  "
              key={user.id}
              onMouseEnter={() => setHoveredId(user.id)}
            >
              <Avatar src={user.avatar} size={120} radius={120} mx="auto" />
              <Text ta="center" fz="lg" fw={500} mt="md">
                {`${user.first_name} ${user.last_name}`}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {user.email}
              </Text>
              {hoveredId === user.id && <ListOption user={user} />}
            </Paper>
          );
        })}
      </div>

      <div className="flex gap-5 justify-end">
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
    </div>
  );
};

export default ListView;
