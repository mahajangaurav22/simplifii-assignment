import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState([]);
  console.log(data);

  const tempData = [];

  useEffect(() => {
    const endInd = page * 10;
    const startInd = endInd - 10;
    // const datas = [];
    // const currInd = 0;
    for (let index = startInd; index <= endInd; index++) {
      if (data.length > 0) {
        tempData.push(data[index]);
      }
    }
    setDatas(tempData);
    console.log(data);
  }, [page, data]);

  // console.log(page);

  const fetchData = async () => {
    const response = await fetch(
      `https://mockrestapi.herokuapp.com/api/employee?pageNo=1&limit=5.json`,
      {
        headers: {
          "Content-Type": "application/json",
          // 'Accept': 'application/json'
        },
      }
    );

    const resp = await response.json();
    await setData(resp.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pageChangeHandler = (btn) => {
    if (btn == "next" && page) {
      setPage(page + 1);
    } else if (btn == "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  // const content = datas.map((data) => (
  //   <tr>
  //     <td>{data._id}</td>
  //     <td>{data.name}</td>
  //     <td>{data.email}</td>
  //     <td>{data.phone}</td>
  //     <td>{data.country}</td>
  //   </tr>
  // ));

  return (
    <div className="App">
      {/* <h1>List o</h1> */}

      <button style={{padding:"5px", borderRadius:"10px", margin:"5px", backgroundColor:"green"}}>ADD</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>
          {datas.length > 0 && (
            <>
              {datas.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{data.country}</td>
                  <td>
                    <button style={{padding:"5px", borderRadius:"10px", margin:"5px", backgroundColor:"red"}}>DELETE</button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <div  > 
        <button style={{padding:"5px", borderRadius:"10px", margin:"5px"}} onClick={() => pageChangeHandler("prev")}>BACK</button>
        <button onClick={() => pageChangeHandler("next")} style={{padding:"5px", borderRadius:"10px"}}>NEXT</button>
      </div>
    </div>
  );
}

export default App;
