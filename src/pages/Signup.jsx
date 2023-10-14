import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Signup = () => {
  let nav=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [conpass, setconPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const sendSignup = async () => {
    if (!name || !email || !pass || !phone || !conpass) {
      alert("please enter required area");
    } else {
      if (pass.length < 8 && pass.length > 16) {
        alert("password must be at least 16 characters");
      } else {
        if (pass === conpass) {
          {
            console.log(isAdmin);
            let res = await fetch("http://localhost:3000/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                pass,
                phone,
                isAdmin,
              }),
            });
            let data = await res.json();
          }
        }
         else {
          alert("password not matches");
        }
        nav("/")
      }
    }
   
  };

  return (
    <div className="main-signup">
      <div className="signupform">
        <h1>Signup</h1>

        <input
          type="text"
          placeholder="enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your number"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="enter your password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="reenter password"
          onChange={(e) => {
            setconPass(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setIsAdmin(e.target.value);
          }}
        >
          <option value="false">User</option>
          <option value="true">Admin</option>
        </select>
      </div>
      <button onClick={sendSignup}>Signup</button>
    </div>
  );
};

export default Signup;
