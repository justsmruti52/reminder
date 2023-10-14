import React, { useEffect, useState } from "react";

const Loginnav = () => {
  const [login, setLogin] = useState([]);

  const getLogin = async () => {
    let res = await fetch("http://localhost:3000/currentuser");
    let data = await res.json();
    setLogin(data);
    // console.log(login.isAdmin)
    console.log(data);
  };
  useEffect(() => {
    getLogin();
  }, []);

  function getDayOfWeek() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    return dayOfWeek;
  }

  function getCurrentDate() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const today = new Date();
    return today.toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <h1 style={{ fontSize: "30px", color: "black", margin: 40 }}>
       Welcome to the Reminder Application {login.name}
      </h1>
      <h2 style={{ fontSize: "20px", color: "black", margin: 40 }}>
        {`Today is ${getDayOfWeek()}, ${getCurrentDate()}`}
      </h2>
      <div className="user-panel">
        <div style={{ display: "flex", justifyContent: "space-evenly", flexDirection:"column" ,gap:10 }}>
          <button><a href="/setreminder">Set Reminder</a></button>
          <button><a href="/modify">Modify Reminder</a></button>
          <button><a href="/disable-reminder">Disable Reminder</a></button>
          <button><a href="/delete-reminder">Delete Reminder</a></button>
          <button><a href="/enable-reminder">Enable Reminder</a></button>
          <button><a href="/view-reminders">View your Reminders</a></button>
          <button><a href="/logout">Log Out</a></button>
        </div>
      </div>
    </div>
  );
};

export default Loginnav;
