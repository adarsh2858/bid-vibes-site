import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import "../../public/css/all-users.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState([]);
  const [hoverEffect, setHoverEffect] = useState(false);

  const firstRef = useRef(null);
  const firstRender = useRef(true);

  const [lengthValue, setLengthValue] = useState(5);
  const [startValue, setStartValue] = useState(0);

  const paginationButtonsClassnames = classnames(
    "p-2 m-2 text-decoration-none",
    {
      // "bg-primary": hoverEffect,
      "text-white": hoverEffect,
    }
  );

  const fetchUsers = async () => {
    let usersList = await axios.get("/all-users", {
      headers: {
        Accept: "application/json",
      },
    });

    setUsers(usersList.data);
    setShowUsers(usersList.data.slice(0, 5));
  };

  const fetchTableData = () => {
    let showUsers = [];
    for (let i = startValue; i < lengthValue; i++) {
      showUsers.push(users[i]);
    }
    setShowUsers(showUsers);
  };

  useEffect(() => {
    console.log(firstRender);
    if (!firstRender.current) fetchTableData();
  }, [startValue, lengthValue]);

  useEffect(() => {
    fetchUsers();
    firstRender.current = false;
  }, []);

  return (
    <div className="p-3">
      <h1>ALL USERS</h1>
      <button onClick={fetchUsers}>Fetch Latest Users</button>
      {showUsers.length > 0 ? (
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
              {showUsers.map(({ id, first, last, age }) => {
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
            <a
              href="#"
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
            >
              &laquo;
            </a>
            <button
              ref={firstRef}
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
              onClick={() => {
                setStartValue(0);
                setLengthValue(5);
              }}
            >
              1
            </button>
            <button
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
              onClick={() => {
                setStartValue(5);
                setLengthValue(10);
              }}
            >
              2
            </button>
            <a
              href="#"
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
            >
              3
            </a>
            <a
              href="#"
              onMouseEnter={() => setHoverEffect(true)}
              onMouseLeave={() => setHoverEffect(false)}
              className={paginationButtonsClassnames}
            >
              &raquo;
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AllUsers;
