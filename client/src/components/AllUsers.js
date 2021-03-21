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
    <div className="p-3">
      <h1>ALL USERS</h1>
      <button onClick={fetchUsers}>Fetch Users</button>
      {users ? (
        <div className="">
          <table className="table-headers">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
            {users.map(({ id, first, last, age }) => {
              return (
                <tr className="bg-light m-2 p-2" key={id}>
                  <td className="text-capitalize">{first}</td>
                  <td>{last}</td>
                  <td>{age}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default AllUsers;
