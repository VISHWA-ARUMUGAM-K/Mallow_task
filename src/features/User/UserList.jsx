import { Button, Modal, TextInput } from "@mantine/core";
import { Grid3X3, List, Loader, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetUsersQuery } from "./Slices/userApiSlice";
import TableView from "./components/TableView";
import ListView from "./components/ListView";
import { useDisclosure } from "@mantine/hooks";
import UserForm from "./Form/UserForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  setError,
  setLoading,
  setUsers,
  setCurrentPage,
  setSearchTerm,
  setView,
} from "./Slices/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { data, error, isLoading } = useGetUsersQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const { isLoading: usersLoading, error: userError } =
    useSelector(getAllUsers);
  const { filteredUsers, currentPage, pageSize, searchTerm, view } =
    useSelector((state) => state.users);

  const handleView = (option) => {
    dispatch(setView(option));
  };

  //TODO: Need to use usedeferredvalue here
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const paginateUsers = () => {
    const indexOfLastUser = currentPage * pageSize;
    const indexOfFirstUser = indexOfLastUser - pageSize;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    return currentUsers;
  };

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }

    if (error) {
      dispatch(setError(error));
    }

    if (data) {
      dispatch(setUsers(data.data));
    }
  }, [data, isLoading, error, dispatch]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="bg-custom-grey p-4">
      <div className="flex flex-col justify-center gap-y-8 bg-white p-6">
        <div className="flex justify-between">
          <h1 className="font-medium text-2xl">Users</h1>
          <div className="flex gap-3">
            <TextInput
              rightSection={<Search />}
              placeholder="Input Search Here"
              value={searchTerm}
              onChange={handleSearch}
              ref={inputRef}
            />
            <Modal opened={opened} onClose={close} title="Create New User">
              <UserForm onClose={close} />
            </Modal>
            <Button onClick={open}>Create User</Button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            leftSection={<Grid3X3 />}
            variant={view == "table" ? "gradient" : "default"}
            onClick={() => handleView("table")}
          >
            Table
          </Button>
          <Button
            leftSection={<List />}
            variant={view == "list" ? "gradient" : "default"}
            onClick={() => handleView("list")}
          >
            List
          </Button>
        </div>

        {usersLoading ? (
          <div className="flex justify-center">
            <Loader color="blue"></Loader>
          </div>
        ) : userError ? (
          <div className="flex justify-center text-blue-500 ">
            Something went wrong
          </div>
        ) : paginateUsers().length <= 0 ? (
          <div className="flex justify-center text-blue-500">
            No users found
          </div>
        ) : (
          <>
            {view == "table" && paginateUsers().length > 0 && !usersLoading && (
              <TableView
                users={paginateUsers}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageNumbers={pageNumbers}
              />
            )}
            {view == "list" && paginateUsers().length > 0 && !usersLoading && (
              <ListView
                users={paginateUsers}
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageNumbers={pageNumbers}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
