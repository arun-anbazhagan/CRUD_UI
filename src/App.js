
import React, { useState } from "react";
import "./App.css";
import UserTable from "./UserTable.js";
import AdminForm from "./AdminForm.js";

function App() {
  const [view, setView] = useState("user");
  const [users, setUsers] = useState([]);

  const saveUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const deleteUser = (index) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <h1>Header</h1>
          <div className="buttons">
            <button onClick={() => setView("user")}>User</button>
            <button onClick={() => setView("admin")}>Admin</button>
          </div>
        </div>
      </header>

      <main>
        {view === "user" ? (
          <UserTable users={users} deleteUser={deleteUser} />
        ) : (
          <AdminForm saveUser={saveUser} />
        )}
        {/* <h2>Welcome to User Info</h2> */}
      </main>

      <footer>
        <p>Footer Content</p>
      </footer>
    </div>
  );
}
export default App;