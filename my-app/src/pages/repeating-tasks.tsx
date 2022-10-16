import React, { useCallback, useEffect, useState } from "react";
import AddTask from "../components/addTask";
import supabase from "../components/supabase";

const RepeatingTasks = () => {
  const familyid = 1; // we do auth later
  const [familyName, setFamilyName] = useState("");
  const [repeatedTasks, setRepeatedTasks] = useState<any[] | null>([]);
  const getRecurringTasks = useCallback(async () => {
    let { data: repeated_tasks, error } = await supabase
      .from("repeated_tasks")
      .select("*")
      .eq("familyid", familyid)
      .order("time");
    setRepeatedTasks(repeated_tasks);
  }, []);
  const getFamilyName = useCallback(async () => {
    let { data: familynames, error } = await supabase
      .from("families")
      .select("familyname")
      .eq("id", familyid);
    const familyname = familynames ? familynames[0].familyname : "";
    setFamilyName(familyname as string);
  }, []);

  useEffect(() => {
    getRecurringTasks();
  }, [getRecurringTasks]);

  useEffect(() => {
    getFamilyName();
  }, [getFamilyName]);

  const [addTaskModal, setAddTaskModal] = useState(false);

  const toggleModal = () => {
    setAddTaskModal(!addTaskModal);
  };

  const submitTask = async (task: any, time: any) => {
    const { data, error } = await supabase
      .from("repeated_tasks")
      .insert([{ task: task, time: time, familyid: familyid }]);
    // window.location.reload();
    await getRecurringTasks();
  };

  return (
    <div>
      <div>
        <p className="text-2xl py-5">Repeating Tasks</p>
      </div>
      <div>
        <p className="text-2xl py-5">{familyName}</p>
      </div>
      <div className="flex justify-center items-center">
        <table>
          <thead>
            <tr>
              <th className="border border-sky-400 bg-sky-300">Time</th>
              <th className="border border-sky-400 bg-sky-300">Name</th>
              <th className="border border-sky-400 bg-sky-300">Allocated to</th>
            </tr>
          </thead>
          <tbody>
            {repeatedTasks?.map((task) => {
              return (
                <tr key={task.id} className="bg-white border border-sky-400">
                  <td>{task.time}</td>
                  <td>{task.task}</td>
                  <td>{task.allocated_to}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="bg-sky-400 my-4 p-2" onClick={toggleModal}>
        Add new repeated task
      </button>
      <div
        className={`fixed mx-auto top-[30%] right-[40%] flex justify-center items-center ${
          addTaskModal ? "w-[300px] h-[200px] bg-sky-300" : ""
        }`}
      >
        {addTaskModal ? (
          <AddTask toggleModal={toggleModal} submitTask={submitTask} />
        ) : null}
      </div>
    </div>
  );
};

export default RepeatingTasks;
