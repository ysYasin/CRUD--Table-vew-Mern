import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayCrudDetails from "./Components/DisplayCrudDetails";
import { Outlet } from "react-router-dom";

function App() {
  const [vewForm, setVewForm] = useState(false);

  const handleSubmitData = (event) => {
    event.preventDefault();

    let form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const address = form.address.value;

    const newCrud = { name, email, number, address };
    console.log(newCrud);
    fetch("http://localhost:5300/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCrud),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success(`${name} is Updated`, {
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
            form.reset();
            setVewForm(false);
            window.location.reload();
          }, 2500);
        } else {
          toast.warning(`${name} is not updated`, {
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
      <h1 className="text-center my-3 font-semibold">CRUD -Table vew</h1>
      <button
        onClick={() => {
          setVewForm(!vewForm);
        }}
        className="bg-rose-500 mb-8 text-white hover:bg-rose-600"
      >
        Create CRUD
      </button>
      {vewForm && (
        <form
          onSubmit={handleSubmitData}
          className="py-8 my-3 flex flex-col items-center justify-center gap-2 w-full bg-slate-200 rounded-3xl"
        >
          <input
            type="text"
            placeholder="Type you'r name"
            name="name"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            type="email"
            placeholder="Type you'r email"
            name="email"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Type you'r address"
            name="address"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            type="Number"
            placeholder="Type you'r Phone number"
            name="number"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button
            type="submit"
            className="bg-rose-500 my-3 text-white hover:bg-rose-600"
          >
            Add to CRUD
          </button>
        </form>
      )}
      <hr />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
