import "./App.css";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect } from "react";
import axios from "axios";
import SingleTask from "./SingleTask";
function App() {
  const [list, setList] = React.useState([]);
  const [input, setInput] = React.useState("");

  const url = "http://127.0.0.1:8000/api/";
  const getAllTasks = () => {
    axios
      .post(`${url}viewlist/`, { params: input })
      .then((res) => {
        const allTasks = res.data;
        setList(allTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [newTask, setNewTask] = React.useState("");
  function prevD(e) {
    e.preventDefault();
    var task=newTask;
    axios
      .post(`${url}add/`,{task})
      .then((res) => {
        console.log(res.data);
        getAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
    setNewTask("");
  }
  useEffect(() => {
    getAllTasks();
  }, []);
  useEffect(() => {
    getAllTasks();
  }, [input]);
  return (
    <div className="container">
      {/* Title */}
      <div className="title">To Do List</div>
      <form
        className="addTask"
        onSubmit={(e) => {
          prevD(e);
        }}
      >
        <input
          name="addTask"
          className="inputClass"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        ></input>
        <input className="submitClass" type="submit" value="+"></input>
      </form>
      <div className="unOrder">
        {/* SearchBar */}
        <div className="searchBar">
          <input
            name="task"
            className="Searchable"
            placeholder="Search"
            defaultValue={input}
            onKeyUp={(e) => {
              setInput(e.target.value);
            }}
            type="text"
          ></input>
        </div>
        {/* List */}
        {list.length > 0 ? (
          list.map((singleTask) => {
            return (
              <SingleTask
                singleTask={singleTask}
                key={singleTask.id}
                getAllTasks={getAllTasks}
              />
            );
          })
        ) : (
          // <div className="singleTask Searchable"></div>
          <></>
        )}
      </div>
      {/* New task */}
    </div>
  );
}

export default App;
