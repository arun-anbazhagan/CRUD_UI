import React, {useEffect, useState} from "react";
import './App.css';


function UserTable() {
  const [users,setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});

  //get a data 
  const fetchData=()=>{
    fetch("http://localhost:3000/users/read", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    })
      .then((response) => response.json())
      .then((data)=>setUsers(data.data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchData();
  },[]);
  
   //delete a data
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/deleteone/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        alert("User deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };



       const startEditing = (user) => {
         setEditingUserId(user._id);
         setEditData(user);
       };
       const cancelEditing = () => {
        setEditingUserId(null);
        setEditData({});
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
      };

      const saveEdit = () => {
        console.log("seee");
        fetch("http://localhost:3000/users/updateUser/"+`${editingUserId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update user");
            }
            return response.json(); // Optional: Parse the response if necessary
          })
          .then(() => {
            alert("User updated successfully");
            fetchData(); // Refresh the user list
            cancelEditing(); // Exit editing mode
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      };
      
  
  

  return (
      <div>
       <h2>User Information</h2>
       {users.length === 0 ? (
         <p>No users available. Please add some users.</p>
       ) : (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>College</th>
              <th>University</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* editing table */}
            {users.map((user) => editingUserId === user._id ? (
                <tr key={user._id}>
                  <td>
                    <input
                      type="text"
                      name="firstname"
                      value={editData.firstname || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastname"
                      value={editData.lastname || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="age"
                      value={editData.age || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="college"
                      value={editData.college ||""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="university"
                      value={editData.university || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={editData.address || ""}
                      onChange={handleInputChange}
                      />
                  </td>
                  <td>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={user._id}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.age}</td>
                  <td>{user.college}</td>
                  <td>{user.university}</td>
                  <td>{user.address}</td>
                  <td>
                    <button onClick={() => startEditing(user)}>Edit</button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;


