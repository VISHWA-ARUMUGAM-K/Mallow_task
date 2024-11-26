import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  searchTerm: "",
  currentPage: 1,
  pageSize: 4,
  isLoading: false,
  error: null,
  view: "table",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    createUser: (state, action) => {
      state.users.push(action.payload);
      state.filteredUsers.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id } = action.payload;
      state.filteredUsers = state.filteredUsers.map((person) => {
        if (person.id == id) {
          return action.payload;
        }
        return person;
      });
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.filteredUsers = state.filteredUsers.filter((person) => {
        return person.id !== id;
      });
      state.users = state.filteredUsers;
    },

    // search and pagination
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (action.payload.trim() === "") {
        // If search term is empty, show all items
        state.filteredUsers = state.users;
      } else {
        // If search term is provided, filter items
        state.filteredUsers = state.users.filter(
          (item) =>
            item.first_name
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            item.last_name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
      state.currentPage = 1; // Reset to the first page when the search term changes
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setView: (state, action) => {
      if (action.payload === state.view) return;
      state.view = action.payload;
    },
  },
});

export const {
  setUsers,
  setLoading,
  setError,
  createUser,
  updateUser,
  deleteUser,
  setCurrentPage,
  setSearchTerm,
  setView,
} = userSlice.actions;

export default userSlice.reducer;

export const getAllUsers = (state) => state.users;
export const getView = (state) => state.users.view;
export const selectFilteredUsers = (state) => state.users.filteredUsers;
export const selectSearchTerm = (state) => state.users.searchTerm;
export const getCurrentPage = (state) => state.users.currentPage;
export const getPageSize = (state) => state.users.pageSize;

// export const selectPaginatedUsers = (state) => {
//   const { filteredUsers, currentPage, pageSize } = state.users;
//   const startIndex = (currentPage - 1) * pageSize;
//   const endIndex = startIndex + pageSize;
//   return filteredUsers.slice(startIndex, endIndex);
// };
