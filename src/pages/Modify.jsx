import React, { useEffect, useState } from "react";

function Modify() {
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [smsNo, setSmsNo] = useState("");
  const [recurrenceDays, setRecurrenceDays] = useState([]);
  const [reminder, SetReminder] = useState([]);
  const [subject, setSubject] = useState("");
  const [descriptionKey, setDescription] = useState("");
  const [rem, setRem] = useState("");

  const handleRecurrenceChange = (day) => {
    if (recurrenceDays.includes(day)) {
      setRecurrenceDays(recurrenceDays.filter((d) => d !== day));
    } else {
      setRecurrenceDays([...recurrenceDays, day]);
    }
  };
  const getEmail = ()=>{
    return rem.email ;
  }
  const getdata = async () => {
    let reminderdata = await fetch("http://localhost:3000/reminder");
    let reminder_ = await reminderdata.json();
    SetReminder(reminder_);
  };
  useEffect(() => {
    getdata()
    activeReminder()
  }, [descriptionKey]);
  console.log(reminder);

  const activeReminder = async () => {
    console.log(descriptionKey, "fasfsfssds");
    let rem = await fetch(
      `http://localhost:3000/reminder?description=${descriptionKey}`
    );
    let remdata = await rem.json();
    setRem(remdata);
  };
  const updateReminder = async () => {
    let res1 = await fetch(
      `http://localhost:3000/reminder?description=${descriptionKey}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedDate,
          email,
          contactNo,
          smsNo,
          recurrenceDays,
        }),
      }
    );
  };
  return (
    <>
      <div>Modify</div>
      {/* <select onChange={(e) => setIssueBookName(e.target.value)}>
        <option value="">select Book</option>
        {issuedDataArr.map((e) => {
          return <option value={e.bookMovie}>{e.bookMovie}</option>;
        })}
      </select> */}
      <select name="" id="" onChange={(e) => setSubject(e.target.value)}>
        <option value="">select subject</option>
        {reminder.map((rem) => {
          return (
            <option value={rem.selectedSubject}>{rem.selectedSubject}</option>
          );
        })}
      </select>
      <select
        name=""
        id=""
        onChange={(e) => {
          setDescription(e.target.value);
          activeReminder();
        }}
      >
        <option value="">select book</option>
        {reminder.map((rem) => {
          if (rem.selectedSubject === subject)
            return <option value={rem.description}>{rem.description}</option>;
        })}
      </select>

      <div>
        <h1>update Reminder</h1>
        <div style={{ display: "flex" }}>
          <form>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={rem.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Contact No:</label>
              <input
                className="check-box-r"
                type="text"
                value={rem.contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </div>

            <div>
              <label>SMS No:</label>
              <input
                className="check-box-r"
                type="text"
                value={rem.smsNo}
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
            <button type="submit" onClick={() => updateReminder()}>
              Set Reminder
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modify;
