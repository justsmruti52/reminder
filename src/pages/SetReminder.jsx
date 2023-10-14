import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SetReminderPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [smsNo, setSmsNo] = useState("");
  const [recurrenceDays, setRecurrenceDays] = useState([]);

  const [login, setLogin] = useState([]);
  const [activeUser, setActiveUser] = useState([]);

  const getLogin = async () => {
    let res = await fetch("http://localhost:3000/currentuser");
    let data = await res.json();
    setLogin(data);
    setActiveUser(data.name);
    // console.log(login.isAdmin)
    console.log(data);
  };

  useEffect(() => {
    getLogin();
  }, []);

  const handleRecurrenceChange = (day) => {
    if (recurrenceDays.includes(day)) {
      setRecurrenceDays(recurrenceDays.filter((d) => d !== day));
    } else {
      setRecurrenceDays([...recurrenceDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here, including validation and sending data to a server.
  };
  const setReminder = async () => {
    
    let res = await fetch("http://localhost:3000/reminder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activeUser,
        selectedDate,
        selectedSubject,
        description,
        email,
        contactNo,
        smsNo,
        recurrenceDays,
      }),
    });
  };

  return (
    <div>
      <h1>Set a new Reminder</h1>
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Select a Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
            >
              <option value="subject1">Subject 1</option>
              <option value="subject2">Subject 2</option>
              {/* Add more subjects as needed */}
            </select>
          </div>
          <div>
            <label>description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contact No:</label>
            <input
              className="check-box-r"
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>
          <div>
            <label>SMS No:</label>
            <input
              className="check-box-r"
              type="text"
              value={smsNo}
              onChange={(e) => setSmsNo(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <label>Recur for next:</label>
              <label>
                <input
                  className="check-box-r"
                  type="checkbox"
                  checked={recurrenceDays.includes("7 Days")}
                  onChange={() => handleRecurrenceChange("7 Days")}
                />
                7 Days
              </label>
              <label>
                <input
                  className="check-box-r"
                  type="checkbox"
                  checked={recurrenceDays.includes("5 Days")}
                  onChange={() => handleRecurrenceChange("5 Days")}
                />
                5 Days
              </label>
              <label>
                <input
                  className="check-box-r"
                  type="checkbox"
                  checked={recurrenceDays.includes("3 Days")}
                  onChange={() => handleRecurrenceChange("3 Days")}
                />
                3 Days
              </label>
              <label>
                <input
                  className="check-box-r"
                  type="checkbox"
                  checked={recurrenceDays.includes("2 Days")}
                  onChange={() => handleRecurrenceChange("2 Days")}
                />
                2 Days
              </label>
            </div>
          </div>
          <button type="submit" onClick={()=>setReminder()}>
            Set Reminder
          </button>
        </form>
      </div>
      <button onClick={() => console.log("Log Out")}>Log Out</button>
    </div>
  );
};

export default SetReminderPage;
