import React, { useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Map from "./Map";
import Modal from "react-modal";

const NavBar = ({
  authenticated,
  userName,
  logOut,
  setUserLocationInMap,
  history,
}) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState({});

  // useEffect(() => {
  //   setRedirect(false);
  // }, []);

  const setMapPosition = (position) => {
    setPosition(position);
  };

  const mapButtonStyle = {
    backgroundColor: "#306060",

    borderTopRightRadius: "1rem",
  };

  function isEmpty(val) {
    return Object.entries(val).length === 0 ? true : false;
  }

  const openModal = () => {
    setMapPosition({});
    setIsMenuActive(false);
    //setUserLocationInMap(position)

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMapPosition({});
    setIsModalOpen(false);
  };

  const aceptMapPosition = () => {
    if (!isEmpty(position)) {
      setUserLocationInMap(position);
      setIsModalOpen(false);
      // setRedirect(true);
      history.push("/missingPets");
    }
  };

  const toogleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const isClientMobile = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      return true;
    } else return false;
  };

  const modalStyle = {
    content: {
      position: "absolute",
      top: "5rem",
      left: "12rem",
      right: "12rem",
      bottom: "5rem",
      overflow: "hidden",
      padding: "0px",
    },
  };

  const modalSmStyle = {
    content: {
      position: "absolute",
      top: "0rem",
      left: "0rem",
      right: "0rem",
      bottom: "0rem",
      overflow: "hidden",
      padding: "0px",
    },
  };

  return (

    <nav className="flex flex-col items-start bg-white mb-3 lg:flex-row lg:justify-between lg:items-center lg:mx-5 relative ">
      <div className="NavBar1 flex flex-row w-full items-center p-5 justify-between lg:w-1/2 ">

        <div onClick={toogleMenu} className="text-gray-600 lg:hidden">
          <svg fill="#2d3748" viewBox="0 0 100 80" width="25" height="25">
            <rect x="25" width="50" height="10" rx="8"></rect>
            <rect y="30" width="100" height="10" rx="8"></rect>
            <rect x="25" y="60" width="50" height="10" rx="8"></rect>
          </svg>
        </div>

        <div className="flex flex-row">
          <Link
            onClick={() => {
              setIsMenuActive(false);
            }}
            to={"/"}
          >
            <div>
              <img class="log" src="./PerdidosYa_Logo_03.svg" alt=""></img>
            </div>
            <div>
              <h1 className="text-red-400">erdidos ya</h1>
            </div>

          </Link>
        </div>

        <div className=""></div>
      </div>

      <div className={`${isMenuActive ? "" : "hidden"} lg:flex`}>

        <div className="dropDown text-md bg-gray-800 text-white absolute items-center top-0 mt-16 py-2 pl-5 z-40 w-screen lg:relative lg:w-full lg:mt-0 lg:justify-center lg:flex-row ">
          {authenticated ? (
            <div>
              <div className="block lg:inline-block lg:mt-0 hover:text-white lg:mx-6 ">
                <div className=" lg:mt-0  hover:text-white lg:mr-4 ">

                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/"}
                >
                  Home
                </Link>
              </div>


              <div className=" mt-4  lg:mt-0 hover:text-white lg:mr-4">
                <div className="cursor-pointer" onClick={openModal}>
                  Mascotas Perdidas
                </div>
                {/* {redirect && <Redirect to={"/missingPets"} />} */}
              </div>

              <div className="link mt-4  lg:mt-0 hover:text-white lg:mr-4 ">

                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/userAdmin"}
                >
                  {userName}
                </Link>
              </div>

              <div className="link mt-4 lg:mt-0  hover:text-white lg:mr-4 ">

                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/petadmin"}
                >
                  Mis Mascotas
                </Link>
              </div>

              <div
                onClick={logOut}

                className="link mt-4 lg:mt-0 hover:text-white lg:mr-4 cursor-pointer"

              >
                Cerrar sesión
              </div>
            </div>
          ) : (

            <div className="flex flex-col lg:items-center lg:flex-row">
              <div className="lg:mt-0 hover:text-white lg:mr-4">
                <div className="cursor-pointer" onClick={openModal}>
                  Mascotas Perdidas
                </div>
                {/* {redirect && <Redirect to={"/missingPets"} />} */}
              </div>
              <div className="link mt-4 lg:mt-0 hover:text-white lg:hidden ">

                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/"}
                >
                  Home
                </Link>
              </div>

              <div className=" link mt-4 lg:mt-0  hover:text-white lg:mr-4 ">

                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/register"}
                >
                  Registrarse
                </Link>
              </div>

              <div className="link mt-4 lg:mt-0 hover:text-white lg:mr-4 ">

                <Link
                  onClick={() => {
                    setIsMenuActive(false);
                  }}
                  to={"/login"}
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        onRequestClose={closeModal}
        isOpen={isModalOpen}
        style={isClientMobile() ? modalSmStyle : modalStyle}
      >
        <div className="flex flex-col realtive">
          <Map setMapPosition={setMapPosition} circleOn={false} />

          <div className="bg-white w-full h-20 z-40 absolute bottom-0">
            <div className="flex flex-row  p-5 items-center  font-medium">
              <p className="w-2/3 text-center text-base text-gray-700 leading-tight lg:text-lg lg:text-left">
                Dinos dónde te encuentras!
              </p>

              {isClientMobile() ? (
                <button
                  onClick={closeModal}
                  className="bg-orange-200 w-1/3 mx-2"
                >
                  Cerrar
                </button>
              ) : null}
              <button
                onClick={aceptMapPosition}
                className={
                  isEmpty(position)
                    ? "bg-red-200 w-1/3 mx-2"
                    : "bg-green-200 w-1/3 mx-2"
                }
              >
                {isEmpty(position) ? "Seleccione una ubicacion" : "Aceptar"}
              </button>
            </div>
          </div>
          {/* <button
            onClick={aceptMapPosition}
            style={mapButtonStyle}
            className="w-40 absolute z-40 bottom-0 hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Aceptar
          </button> */}
        </div>
      </Modal>
    </nav>
  );
};

export default withRouter(NavBar);
