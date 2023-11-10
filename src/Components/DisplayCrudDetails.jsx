import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisplayCrudDetails = () => {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5300/users")
      .then((res) => res.json())
      .then((data) => setUser(data.users));
  }, []);

  const handleDelet = (id) => {
    fetch(`http://localhost:5300/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = users.filter((user) => user._id !== id);
        setUser(newUsers);
      });
  };

  return (
    <div className="my-7 bg-">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl font-semibold">Name</th>
              <th className="text-xl font-semibold">Phone</th>
              <th className="text-xl font-semibold">Email</th>
              <th className="text-xl font-semibold">Location</th>
              <th className="text-xl font-semibold flex items-center justify-around">
                <p className="text-center">Edit</p>{" "}
                <p className="text-center">Delete</p>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.number}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className="flex justify-around">
                    <Link to={`/edit/${user._id}`}>
                      {" "}
                      <button className="btn btn-accent">EDIT</button>
                    </Link>{" "}
                    <button
                      onClick={() => handleDelet(user._id)}
                      className="btn btn-secondary"
                    >
                      DELET
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayCrudDetails;
