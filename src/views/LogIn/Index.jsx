import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Index = ({ logIn }) => {
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      aux[name] = value;
      return aux;
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = await fetch("http://localhost:3030/api/owner/login", {
        method: "post",
        //mode: "no-cors",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let data = await result.json();
      if (!data.Error) {
        logIn(data);
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center  items-center h-full mt-10 p-5 ">
      <form
        noValidate
        onSubmit={onHandleSubmit}
        //style={formStyle}
        className="cardForm  w-full max-w-lg bg-gray-200 shadow-md px-8 pt-6 pb-8 "
      >
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="textLogin block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="email"
            >
              Email
            </label>
            <input
              noValidate
              //style={inputStyle}
              onChange={onHandleChange}
              className="inputLogin textLogin appearance-none block bg-green-200 w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="email"
              type="email"
            ></input>
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="textLogin block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="password"
            >
              Contraseña
            </label>

            <input
              noValidate
              //style={inputStyle}
              onChange={onHandleChange}
              className="inputLogin appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="password"
              type="password"
            ></input>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            className="buttonLogin w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Ingresar
          </button>
          {redirect && <Redirect to={"/"} />}
        </div>
      </form>
    </div>
  );
};

export default Index;
