import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../utils/LoadingSpinner";

function SignUp() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = React.useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  }

  async function handleSubmit() {
    try {
      // setIsLoading(true);
      const res = await axios.post("/api/v1/users/register", form);
      console.log(res.data);
      navigate("/userAvatar");
    } catch (error) {
      // setIsLoading(false)
      console.error("Error creating user:", error.response);
      setMessage(error.response?.data?.message);
    } finally {
      // setIsLoading(false)
    }
  }
  const formvalues = [
    { value: "fullname", placeholder: "Full name", type: "text" },
    { value: "username", placeholder: "User name", type: "text" },
    { value: "email", placeholder: "Email", type: "email" },
    { value: "password", placeholder: "Password", type: "password" },
  ];
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md border border-secondary p-6">
      <img
        src="../../../src/assets/socialite-logo.png"
        alt="insta"
        className="w-60 m-auto"
      />

      <p className="mt-2 text-center text-base text-gray-500">
        Already have an account?
        <Link
          to="/login"
          className="font-sm text-gray-200 transition-all duration-200 hover:underline"
        >
          Login
        </Link>
      </p>
      <form className="mt-8">
        {message && <p className="text-red-400">{message}</p>}
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

          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 mt-3 font-semibold leading-7 text-white hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;

// import React, { useState } from "react";

// function Signup() {
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(""); // To handle errors

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Validate form fields here, e.g., check password strength, email format
//     if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
//       setError(
//         "Password must be at least 8 characters with 1 uppercase letter, 1 lowercase letter, and 1 number."
//       );
//       return;
//     } else if (password !== confirmPassword) {
//       setError("Passwords don't match.");
//       return;
//     }

//     // Handle form submission, e.g., send data to an API (replace with your backend logic)
//     // console.log('Full name:', fullName);
//     // console.log('Username:', username);
//     // console.log('Email:', email);
//     // console.log('Password:', password);

//     // ... redirect to home page or show success message
//   };

//   return (
//     <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <img
//             className="mx-auto h-12 w-auto"
//             src="https://www.instagram.com/static/static/build/333b2710d97d19f0a2d502c004022a22.png"
//             alt="Instagram logo"
//           />
//           <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
//             Sign up to see photos and videos from your friends.
//           </h2>
//         </div>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="fullName" className="sr-only">
//               Full Name
//             </label>
//             <input
//               id="fullName"
//               name="fullName"
//               type="text"
//               autoComplete="name"
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="username" className="sr-only">
//               Username
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               autoComplete="username"
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email or phone number
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Email or phone number"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <button type="submit">Sign up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;
