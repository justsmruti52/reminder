import React, { useEffect, useState } from "react";
import Loginnav from "./Loginnav";
import { useNavigate } from "react-router-dom";

const Loginhome = () => {
  const [loginarr, setLoginarr] = useState([]);
  const currentuser = async () => {
    let res = await fetch("http://localhost:3000/currentuser");
    let data = await res.json();
    setLoginarr(data);
    console.log(loginarr.length);
  };
  useEffect(() => {
    currentuser();
  }, []);
  let nav = useNavigate();

  return (
    <>
      {loginarr.isLogin == true ? (
        <div>
          <Loginnav />
        </div>
      ) : (
        nav("/")
      )}
    </>
  );
};

export default Loginhome;
