import React, { useEffect, useState } from "react";
import Loginnav from "./Loginnav";

const Trasaction = () => {
  const [isBookAvailable, setBookAvailable] = useState(false);
  const [isIssueBook, setIssueBook] = useState(false);
  const [isReturnBook, setReturnBook] = useState(false);
  const [isPayFine, setPayFine] = useState(false);
  const [isBooksearch, setBooksearch] = useState(false);
  const [isSearchBook, setSearchBook] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [issuedDataArr, setIssuedDataArr] = useState([]);
  const [bookname, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [issueBookName,setIssueBookName] = useState("")
  const [IssueAuthor,setIssueAuthor] = useState("")
  const [issueDate,setIssueDate] = useState("")
  const [returDate,setReturDate] = useState("")
  const [remarks,setRemarks] = useState("")

  const getData = async () => {
    let res = await fetch("http://localhost:3000/bookmovie");
    let data = await res.json();
    setDataArr(data);
    let newData = dataArr.filter((el)=>(el.isAvailable === true))
    setIssuedDataArr(newData)
    console.log(newData)
  };
  useEffect(() => {
    getData();
  }, []);

  const search = () => {
    dataArr.forEach((el) => {
      if (el.bookMovie === bookname && el.author === author) {
        // http://localhost:3000/bookmovie?bookMovie=${bookname}&author=${author}
        setSearchArr([...searchArr,el]);
        console.log(searchArr);
      }
    });
    setSearchBook(true);
    setBooksearch(false);

    console.log(searchArr);
  };
  const issueBook = async (el) => {
    setSearchBook(false);
    setIssueBook(true);

    
    
    // let data = await res.json();
  };

  async function handleIssue(){
    let id;

    let res2 = await fetch("http://localhost:3000/currentuser");
    let data2 = await res2.json();
    console.log(data2.id,"current");
     
     let res = await fetch(`http://localhost:3000/bookmovie?bookMovie=${issueBookName}`)
     let data = await res.json();
     console.log(data);

     let res1 = await fetch(`http://localhost:3000/bookmovie/${data[0].id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        issueDate, returDate, remarks,isAvailable:false,memberShipId:data2.id
      })
     })
}

  return (
    <>
      <Loginnav />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3
            onClick={() => {
              setBookAvailable(true);
              setIssueBook(false);
              setReturnBook(false);
              setPayFine(false);
              setBooksearch(true);
            }}
          >
            Is Book Available
          </h3>
          <h3
            onClick={() => {
              setBookAvailable(false);
              setIssueBook(true);
              setReturnBook(false);
              setPayFine(false);
              setBooksearch(false);
            }}
          >
            Issue Book
          </h3>
          <h3
            onClick={() => {
              setBookAvailable(false);
              setIssueBook(false);
              setReturnBook(true);
              setPayFine(false);
              setBooksearch(false);
            }}
          >
            return book
          </h3>
          <h3
            onClick={() => {
              setBookAvailable(false);
              setIssueBook(false);
              setReturnBook(false);
              setPayFine(true);
              setBooksearch(false);
            }}
          >
            pay Fine
          </h3>
        </div>
        <div>
          <div className={isBookAvailable ? "openDiv" : "closeDiv"}>
            <div className={isBooksearch ? "openDiv" : "closeDiv"}>
              <h2>Book Availability</h2>
              <label>Enter book name</label>
              <select onChange={(e) => setBookName(e.target.value)}>
                <option>select Book</option>
                {dataArr.map((e) => {
                  return <option value={e.bookMovie}>{e.bookMovie}</option>;
                })}
              </select>
              <br></br>
              <label>Enter author name</label>
              <select onChange={(e) => setAuthor(e.target.value)}>
                <option>select Author</option>
                {dataArr.map((e) => {
                  return <option value={e.author}>{e.author}</option>;
                })}
              </select>
              <br></br>
              <button
                onClick={() => {
                  search();
                }}
              >
                Search
              </button>
            </div>
            <div className={isSearchBook ? "openDiv" : "closeDiv"}>
              <h2>searchbook</h2>
              <table>
                <tr>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Serial Number</th>
                  <th>Available</th>
                  <th>Select to issue book</th>
                </tr>
                {searchArr.map((e) => {
                  return (
                    <tr>
                      <td>{e.bookMovie}</td>
                      <td>{e.author}</td>
                      <td>{e.id}</td>
                      <td>{e.isAvailable ? "yes" : "no"}</td>
                      <td>
                        {e.isAvailable ? (
                          <input
                            type="radio"
                            onChange={() => {
                              issueBook(e);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
              </table>
              <button
                onClick={() => {
                  setBooksearch(true);
                  setSearchBook(false);
                }}
              >
                Back
              </button>
            </div>
          </div>
          <div className={isIssueBook ? "openDiv" : "closeDiv"}>
          <label>Enter book name</label>
              <select onChange={(e) => setIssueBookName(e.target.value)} >
                <option value="">select Book</option>
                {issuedDataArr.map((e) => {
                  return <option value={e.bookMovie}>{e.bookMovie}</option>;
                })}
              </select>
              <input type="text" placeholder="Author" onchange={(e)=>{setIssueAuthor(e.target.value)}} />
              <input type="date" placeholder="Author" onchange={(e)=>{setIssueDate(e.target.value)}} />
              <input type="date" placeholder="Author" onchange={(e)=>{setReturDate(e.target.value)}} />
              <input type="text" placeholder="remarks" onchange={(e)=>{setRemarks(e.target.value)}} />
              <button onClick = {handleIssue}>Issue</button>
              
          </div>
          <div className={isReturnBook ? "openDiv" : "closeDiv"}></div>
          <div className={isPayFine ? "openDiv" : "closeDiv"}></div>
        </div>
      </div>
    </>
  );
};

export default Trasaction;
