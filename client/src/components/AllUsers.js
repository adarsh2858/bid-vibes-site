import axios from "axios";
import React, { useEffect, useState } from "react";

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

  useEffect(() => fetchUsers(), []);

  return (
    <div className="p-3">
      <h1>ALL USERS</h1>
      <button onClick={fetchUsers}>Fetch Latest Users</button>
      {users.length > 0 ? (
        <table
          className="m-4"
          id="users-table"
          style={{ width: "75%", height: screen.height }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, first, last, age }) => {
              return (
                <tr key={id}>
                  <td className="text-capitalize">{first}</td>
                  <td>{last}</td>
                  <td>{age}</td>
                </tr>
              );
            })}
          </tbody>
          {/* <tfoot>
            <tr>
              <td>Total Entries</td>
              <td>1</td>
              <td>2</td>
            </tr>
          </tfoot> */}
        </table>
      ) : null}
    </div>
  );
};

export default AllUsers;
