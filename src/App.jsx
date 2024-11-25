import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./features/Login/LoginForm";
import UserList from "./features/User/UserList";

function App() {
  return (
    <div className="mainContainer">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
