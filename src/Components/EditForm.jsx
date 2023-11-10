import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditForm = () => {
  const user = useLoaderData();
  const navigate = useNavigate();

  const handleUpdateData = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const address = form.address.value;
    const number = form.number.value;
    const updated = { name, email, address, number };

    console.log(updated);
    fetch(`http://localhost:5300/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updated }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success(`${name}'s Data is updated sucessfully`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 2500);
        } else {
          toast.warning(`${name}'s Data is not updated`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="my-8 text-center">
        Edit <span className="font-semibold">{user.name}'s</span> details{" "}
      </h1>
      <form
        onSubmit={handleUpdateData}
        className="py-8 my-3 flex flex-col items-center justify-center gap-2 w-full bg-slate-200 rounded-3xl"
      >
        <input
          type="text"
          placeholder="Type you'r name"
          name="name"
          defaultValue={user.name}
          className="input input-bordered input-info w-full max-w-xs"
        />
        <input
          type="email"
          placeholder="Type you'r email"
          name="email"
          defaultValue={user.email}
          className="input input-bordered input-info w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Type you'r address"
          name="address"
          defaultValue={user.address}
          className="input input-bordered input-info w-full max-w-xs"
        />
        <input
          type="Number"
          placeholder="Type you'r Phone number"
          defaultValue={user.number}
          name="number"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <button
          type="submit"
          className="bg-rose-500 my-3 text-white hover:bg-rose-600"
        >
          Update Details
        </button>
      </form>{" "}
      <ToastContainer />
    </div>
  );
};

export default EditForm;
