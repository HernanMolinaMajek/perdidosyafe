import React, { useState, useEffect } from "react";

const Index = ({ match, user }) => {
  const isEditig = Object.entries(match.params).length === 0 ? false : true;
  const method = isEditig ? "PUT" : "POST";

  const [formErrors, setFormErrors] = useState({
    name: "",
    breed: "",
    description: "",
    age: "",
    img: "",
  });
  const [form, setForm] = useState({
    _ownerId: user._name,
    name: "",
    sex: "Macho",
    type: "Perro",
    breed: "",
    description: "",
    age: "",

    isLost: false,
  });

  useEffect(() => {
    if (isEditig) {
      getPet().then((pet) => {
        setForm((prevForm) => {
          pet._ownerId = user._id;
          return pet;
        });
      });
    }
  }, []);

  const buttonStyle = {
    backgroundColor: "#306060",
    borderRadius: "1rem",
  };
  const formStyle = {
    backgroundColor: "#F6F6F6",
    borderRadius: "2.5rem",
  };
  const alertStyle = {
    color: "#306060",
  };
  const inputStyle = {
    borderRadius: "1rem",
  };

  const getPet = async () => {
    const response = await fetch(
      `http://localhost:3030/api/pet/${match.params.id}`
    );
    const data = await response.json();
    return data[0];
  };

  const onHandelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const prop in form) {
      formData.append(prop, form[prop]);
    }

    try {
      let resutl = await fetch("http://localhost:3030/api/pet", {
        method: method,
        cors: "no-cors",
        headers: {
          accept: "application/json",
          "content-type": "multipart/form-data", //"application/json",
        },
        body: formData, //JSON.stringify(form),
      });
      console.log(resutl);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevForm) => {
      let aux = Object.assign({}, prevForm);
      aux[name] = value;
      return aux;
    });
  };

  // const formValid = ({ formErrors, ...rest }) => {
  //   let valid = true;
  //   Object.values(formErrors).forEach((error) => {
  //     error.length > 0 && (valid = false);
  //   });

  //   Object.values(rest).forEach((val) => {
  //     val === null && (valid = false);
  //   });

  //   return valid;
  // };

  // const onHandleChange = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let formErrors = form.formErrors;
  //   let mesage = "No puede estar vacio";
  //   switch (name) {
  //     case "name":
  //       formErrors.name = value.length > 0 ? "" : mesage;
  //       break;
  //     case "breed":
  //       formErrors.breed = value.length > 0 ? "" : mesage;
  //       break;
  //     case "age":
  //       formErrors.age = value.length > 0 ? "" : mesage;
  //       break;
  //     case "description":
  //       formErrors.description = value.length > 0 ? "" : mesage;
  //       break;
  //     case "img":
  //       formErrors.img = value.length > 0 ? "" : mesage;
  //       break;
  //     default:
  //       break;
  //   }

  //   setForm((prevForm) => {
  //     let aux = Object.assign({}, prevForm);
  //     aux.formErrors = formErrors;
  //     //aux[name] = value;
  //     return aux;
  //   });
  //   console.log(form);
  // };

  // const onHandelSubmit = (e) => {
  //   e.preventDefault();
  //   if (formValid(form)) {
  //     submit();
  //   } else {
  //     setForm((prevForm) => {
  //       let aux = Object.assign({}, prevForm);
  //       if (aux.name === null) aux.formErrors.name = "No puede estar vacio";
  //       if (aux.breed === null) aux.formErrors.breed = "No puede estar vacio";
  //       if (aux.description === null)
  //         aux.formErrors.description = "No puede estar vacio";
  //       if (aux.age === null) aux.formErrors.age = "No puede estar vacio";
  //       if (aux.img === null) aux.formErrors.img = "No puede estar vacio";

  //       return aux;
  //     });
  //   }
  // };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <form
        noValidate
        onSubmit={onHandelSubmit}
        style={formStyle}
        className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex justify-center mt-1 mb-8">
          <p style={alertStyle} className="text-lg italic">
            Danos toda la información posible!
          </p>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              maxLength="15"
              onChange={onHandleChange}
              noValidate
              value={form.name}
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="name"
              type="text"
            ></input>

            {/* {form.formErrors.name.length > 0 ? "No puede estar vacio" : ""} */}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="type"
            >
              Tipo
            </label>
            <div className="relative">
              <select
                onChange={onHandleChange}
                noValidate
                value={form.type}
                style={inputStyle}
                className="block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="type"
              >
                <option>Perro</option>
                <option>Gato</option>
                <option>Otro</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="breed"
            >
              Raza
            </label>
            <input
              maxLength="15"
              onChange={onHandleChange}
              value={form.breed}
              noValidate
              style={inputStyle}
              className="appearance-none  block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="breed"
              type="text"
            ></input>
            {/* {form.formErrors.breed.length > 0 ? "No puede estar vacio" : ""} */}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="sex"
            >
              Sexo
            </label>
            <div className="relative">
              <select
                onChange={onHandleChange}
                noValidate
                value={form.sex}
                style={inputStyle}
                className="block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="sex"
              >
                <option>Macho</option>
                <option>Hembra</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="age"
            >
              Edad
            </label>
            <input
              onChange={onHandleChange}
              noValidate
              value={form.age}
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="age"
              type="number"
            ></input>
            {/* {form.formErrors.age.length > 0 ? "No puede estar vacio" : ""} */}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="description"
            >
              Descripción general
            </label>
            <input
              maxLength="30"
              onChange={onHandleChange}
              value={form.description}
              noValidate
              style={inputStyle}
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="description"
              type="text"
            ></input>
            {/* {form.formErrors.description.length > 0
              ? "No puede estar vacio"
              : ""} */}
          </div>

          <div className="w-full md:w-1/2 mb-6 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
              htmlFor="img"
            >
              Foto
            </label>
            <input
              onChange={onHandleChange}
              // value={form.img}
              name="img"
              noValidate
              className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="file"
              accept="image/*"
            ></input>
            {/* {form.formErrors.img.length > 0 ? "Debe cargar una foto" : ""} */}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <button
            style={buttonStyle}
            className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Bienvenido
          </button>
        </div>
      </form>
    </div>
  );
};
export default Index;
