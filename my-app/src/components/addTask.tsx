import React, { useState } from "react";

type AddTaskProps = {
  toggleModal: (e: any) => void;
  submitTask: (task: any, time: any) => void;
};

const AddTask: React.FC<AddTaskProps> = ({ toggleModal, submitTask }) => {
  const [task, setTask] = useState("");
  const [time, setTime] = useState(9);
  const handleInputChange = (e: any) => {
    const target = e.target;
    setTask(target.task);
    setTime(target.time);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      task: { value: string };
      time: { value: number };
    };
    await submitTask(formElements.task.value, formElements.time.value);
  };
  return (
    <div className="absolute flex items-center justify-center">
      <form
        onSubmit={(e) => {
          toggleModal(e);
          handleSubmit(e);
        }}
      >
        <label className="block p-2">
          Task:
          <input
            type="text"
            name="task"
            value={task}
            onChange={handleInputChange}
          />
        </label>
        <label className="block p-2">
          Time:
          <input
            type="number"
            name="time"
            value={time}
            onChange={handleInputChange}
          />
        </label>
        <input
          type="submit"
          value="Submit"
          className="text-white bg-sky-500 p-2 m-2 hover:cursor-pointer"
        />
        <button onClick={toggleModal} className="text-white bg-sky-500 p-2 m-2">
          Close
        </button>
      </form>
    </div>
  );
};

export default AddTask;
