import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function SingleTask({ singleTask, getAllTasks }) {
  const [startTime, setStartTime] = React.useState(singleTask.start);
  const [finishTime, setFinishTime] = React.useState(singleTask.finish);

  const url = "http://127.0.0.1:8000/api/";

  function deletee(id) {
    axios
      .post(`${url}del/`, {id})
      .then((res) => {
        console.log(res.data);
        getAllTasks();
        setStartTime(null);
        setFinishTime(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function edit(id, newTask) {
    axios
      .post(`${url}edit/`, {id,newTask})
      .then((res) => {
        console.log(res.data);
        getAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleStart(id) {
    // setStart(true);
    const date = new Date();
    var time = date.toLocaleTimeString();
    axios
      .post(`${url}setStart/`, { id, time })
      .then((res) => {
        console.log(res.data);
        getAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });

    setStartTime(time);
  }
  function handleFinish(id) {
    if (startTime) {
      const date = new Date();
      var time = date.toLocaleTimeString();
      axios
        .post(`${url}setFinish/`, { id, time })
        .then((res) => {
          console.log(res.data);
          getAllTasks();
        })
        .catch((error) => {
          console.log(error);
        });
      setFinishTime(time);
    }
  }
  return (
    <div className="singleTask" key={singleTask.id}>
      <input
        name="task"
        className={finishTime ? "notEditable" : "editable"}
        defaultValue={singleTask.task}
        onBlur={(e) => edit(singleTask.id, e.target.value)}
        type="text"
        readOnly={finishTime && true}
      ></input>
      {startTime ? (
        <div className="time">{startTime}</div>
      ) : (
        <input
          name="start"
          className="btns"
          value="Start"
          type="button"
          onClick={() => handleStart(singleTask.id)}
        ></input>
      )}
      {finishTime ? (
        <div className="time">- &nbsp;{finishTime}</div>
      ) : (
        <input
          name="finish"
          className="btns"
          value="Finish"
          type="button"
          onClick={() => handleFinish(singleTask.id)}
        ></input>
      )}
      <div
        className="cross"
        value={singleTask.task}
        onClick={() => {
          deletee(singleTask.id);
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
}
export default SingleTask;
