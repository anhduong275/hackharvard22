import React, { useCallback, useEffect, useReducer, useState } from "react";
import AddTask from "../components/addTask";
import supabase from "../components/supabase";

const Allocator = () => {
  const familyid = 1; // we do auth later
  const [familyName, setFamilyName] = useState("");
  const [repeatedTasks, setRepeatedTasks] = useState<any[] | null>([]);
  const [nonrepeatedTasks, setNonrepeatedTasks] = useState<any[] | null>([]);
  const [allTodaysTasks, setAllTodaysTasks] = useState<any[] | null>([]);
  let copynon = nonrepeatedTasks;
  let copy = repeatedTasks;
  const getRecurringTasks = useCallback(async () => {
    let { data: repeated_tasks, error } = await supabase
      .from("repeated_tasks")
      .select("*")
      .eq("familyid", familyid)
      .order("time");
    const newrepeated = repeated_tasks!.map((task) => ({
      ...task,
      repeated: true,
    }));
    setRepeatedTasks(newrepeated);
    copy = newrepeated;
    console.log("newrepeated", newrepeated);
    console.log("copy", copy);

    let { data: nonrepeated_tasks } = await supabase //missing error due to naming conflict
      .from("nonrepeated_tasks")
      .select("*")
      .eq("familyid", familyid)
      .order("time");

    const today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    const filteredToday = yyyy + "-" + mm + "-" + dd;

    const filteredTasks = nonrepeated_tasks!.filter((task) =>
      filterTodaysTasks(filteredToday, task)
    );
    const newfiltered = filteredTasks.map((task) => ({
      ...task,
      repeated: false,
    }));
    setNonrepeatedTasks(newfiltered);
    copynon = newfiltered;
    console.log("newfiltered", newfiltered);
    console.log("copynon", copynon);
  }, []);

  const filterTodaysTasks = (today: string, nonrepeatedTask: any) => {
    const date = nonrepeatedTask.created_at.slice(0, 10);
    return date === today;
  };
  const getNonrepeatedTasks = useCallback(async () => {
    let { data: nonrepeated_tasks, error } = await supabase
      .from("nonrepeated_tasks")
      .select("*")
      .eq("familyid", familyid)
      .order("time");

    const today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    const filteredToday = yyyy + "-" + mm + "-" + dd;

    const filteredTasks = nonrepeated_tasks!.filter((task) =>
      filterTodaysTasks(filteredToday, task)
    );
    const newfiltered = filteredTasks.map((task) => ({
      ...task,
      repeated: false,
    }));
    setNonrepeatedTasks(newfiltered);
    copynon = newfiltered;
  }, []);

  const getAllTasks = useCallback(() => {
    let unsortedTodaysTasks: any[] | undefined = [];
    if (copy && copynon) {
      unsortedTodaysTasks = [...copy, ...copynon];
    } else if (copy) {
      unsortedTodaysTasks = [...copy];
    } else if (copynon) {
      unsortedTodaysTasks = [...copynon];
    }

    const sortedTasks = unsortedTodaysTasks.sort((task1, task2) => {
      if (task1.time < task2.time) {
        return -1;
      } else if (task1.time > task2.time) {
        return 1;
      } else {
        return 0;
      }
    });
    const newsortedTasks = [...sortedTasks];
    setAllTodaysTasks(newsortedTasks);
  }, []);

  const getFamilyName = useCallback(async () => {
    let { data: familynames, error } = await supabase
      .from("families")
      .select("familyname")
      .eq("id", familyid);
    const familyname = familynames ? familynames[0].familyname : "";
    setFamilyName(familyname as string);
  }, []);

  const perf = useCallback(async () => {
    await getRecurringTasks().then(() => {
      getAllTasks();
    });
  }, []);

  useEffect(() => {
    perf();
  }, [getRecurringTasks, perf]);

  useEffect(() => {
    getFamilyName();
  }, [getFamilyName]);

  const [addTaskModal, setAddTaskModal] = useState(false);

  const toggleModal = () => {
    setAddTaskModal(!addTaskModal);
  };

  const submitTask = async (task: any, time: any) => {
    const { data, error } = await supabase
      .from("nonrepeated_tasks")
      .insert([{ task: task, time: time, familyid: familyid }]);
    await perf();
  };

  const deleteTask = async (e: any, taskID: number, repeated: boolean) => {
    if (repeated) {
      const { data, error } = await supabase
        .from("repeated_tasks")
        .delete()
        .eq("id", taskID);
    } else {
      const { data, error } = await supabase
        .from("nonrepeated_tasks")
        .delete()
        .eq("id", taskID);
    }
    await perf();
  };

  const getRndInteger = (min: number, max: number) => {
    // min included, max excluded
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const allocate = async () => {
    // fetch people in this family
    let { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("familyid", familyid);
    // count number of people
    const noOfFamilyMembers = users ? users.length : 0;
    const noOfTasks = allTodaysTasks ? allTodaysTasks.length : 0;
    const famMemIDs = users?.map((user) => user.id);
    const sortedTasks = allTodaysTasks;

    if (noOfFamilyMembers) {
      for (let i = 0; i < noOfTasks; i++) {
        const index = getRndInteger(0, noOfFamilyMembers);
        const famMemID = famMemIDs ? famMemIDs[index] : 0; // famMemIDs.len for sure > 0!
        let { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", famMemID); // user is currently a list of 1 user
        sortedTasks![i].allocatedTo = user![0].username;
      }
      const newSortedTasks = sortedTasks ? sortedTasks.slice() : [];
      setAllTodaysTasks(newSortedTasks);
    } else {
      alert("No members in family!");
    }
  };

  return (
    <div>
      <div>
        <p className="text-2xl py-5">Allocating tasks &#40;very random!&#41;</p>
      </div>
      <div>
        <p className="text-2xl py-5">Your family name: {familyName}</p>
      </div>
      <button className="bg-sky-400 my-4 p-2" onClick={allocate}>
        Click to allocate
      </button>
      <div className="flex justify-center items-center">
        <table>
          <thead>
            <tr>
              <th className="border border-sky-400 bg-sky-300">Time</th>
              <th className="border border-sky-400 bg-sky-300">Name</th>
              <th className="border border-sky-400 bg-sky-300">Allocated to</th>
              <th className="border border-sky-400 bg-sky-300">Daily?</th>
              <th className="border border-sky-400 bg-sky-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allTodaysTasks?.map((task) => {
              return (
                <tr
                  key={task.created_at}
                  className="bg-white border border-sky-400"
                >
                  <td>{task.time}</td>
                  <td>{task.task}</td>
                  <td>{task.allocatedTo}</td>
                  <td>{task.repeated ? "Yes" : "No"}</td>
                  <td className="bg-red-400">
                    <button
                      onClick={(e) => {
                        deleteTask(e, task.id, task.repeated);
                      }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="bg-sky-400 my-4 p-2" onClick={toggleModal}>
        Add new nonrepeated task
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

export default Allocator;
