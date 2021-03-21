import axios from "axios";
import React, { useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    let usersList = await axios.get("/all-users", {
      headers: {
        Accept: "application/json",
      },
    });

    setUsers(usersList.data);
  };

  return (
    <div>
      <h1>ALL USERS</h1>
      <button onClick={fetchUsers}>Fetch Users</button>
      {users
        ? users.map((user) => {
            return (
              <div>
                <h1>
                  {user.first}&nbsp;{user.last}
                </h1>
                <div>{user.age}</div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default AllUsers;
