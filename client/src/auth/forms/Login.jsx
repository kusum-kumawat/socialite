import axios from "axios";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  }

  const handleSubmit = async () => {
    try {
      setIsloading(true);
      console.log(form);
      const response = await axios.post("/api/v1/users/login", form);
      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsloading(false);
    }
  };

  const formvalues = [
    { value: "username", placeholder: "Username", type: "text" },
    { value: "password", placeholder: "Password", type: "password" },
  ];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="xl:mx-auto  xl:w-full xl:max-w-sm 2xl:max-w-md border bg-black border-secondary p-6">
      <img
        src="../../../src/assets/socialite-logo.png"
        alt="insta"
        className="m-auto w-60 filter blur-3"
      />
      
      


      <p className="mt-2 text-center text-base text-gray-500 ">
        Don&apos;t have an account?
        <NavLink to="/sign-up">Sign up</NavLink>
      </p>
      <form className="mt-8">
        <div className="space-y-5">
          {formvalues.map((obj, index) => {
            return (
              <div key={index}>
                <div className="mt-2">
                  <input
                    className="custom-input"
                    type={obj.type}
                    placeholder={obj.placeholder}
                    id={obj.value}
                    autoComplete="off"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            );
          })}
          <div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 my-6 px-3.5 py-2.5 font-semibold  text-white "
              onClick={handleSubmit}
            >
              Submit
            </button>
            <Link
              to="/reset-password"
              className="text-sm font-semibold text-gray-500 hover:underline "
            >
              Forget password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
