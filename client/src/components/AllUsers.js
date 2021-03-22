import axios from "axios";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import "../../public/css/all-users.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [hoverEffect, setHoverEffect] = useState(false);

  const paginationButtonsClassnames = classnames(
    "p-2 m-2 text-decoration-none",
    { "bg-primary": hoverEffect, "text-white": hoverEffect }
  );

  const fetchUsers = async () => {
    let usersList = await axios.get("/all-users", {
      headers: {
        Accept: "application/json",
      },
    });

    setUsers(usersList.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-3">
      <h1>ALL USERS</h1>
      <button onClick={fetchUsers}>Fetch Latest Users</button>
      {users.length > 0 ? (
        <div>
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
          </table>
          <div className="d-flex">
            <a href="#" className={paginationButtonsClassnames}>
              &laquo;
            </a>
            <a href="#" className={paginationButtonsClassnames} style={{cursor: "pointer"}}>
              1
            </a>
            <a
              href="#"
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
            >
              2
            </a>
            <a
              href="#"
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
            >
              3
            </a>
            <a href="#" className={paginationButtonsClassnames}>
              4
            </a>
            <a href="#" className={paginationButtonsClassnames}>
              &raquo;
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AllUsers;
