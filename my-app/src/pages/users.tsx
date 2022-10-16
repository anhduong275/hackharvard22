import { render } from "@testing-library/react";
import React, { useCallback, useEffect, useState } from "react";
import supabase from "../components/supabase";
import AddUser from "../components/addUser";

function Users() {
  const familyid = 1; // we do auth later
  const [addUserModal, setAddUserModal] = useState(false);
  const [allUsers, setAllUsers] = useState<any[] | null>([]);

  const toggleModal = () => {
    setAddUserModal(!addUserModal);
  };

  const submitUser = async (user: any) => {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username: user, familyid }]);
  };

  const getUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("familyid", familyid);
    setAllUsers(data);
  };

  useEffect(() => {
    getUsers();
  });

  const deleteUser = async (e: any, userId: any) => {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
  };

  return (
    <div>
      <div>
        <p className="text-2xl py-5">Manage Users</p>
      </div>
      <div className="flex justify-center items-center">
        <table>
          <thead>
            <tr>
              <th className="border-sky-400 bg-sky-300">Users</th>
              <th className="border-sky-400 bg-sky-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((users) => {
              return (
                <tr key={users.id} className="bg-white border border-sky-400">
                  <td>{users.username}</td>
                  <td className="bg-red-400">
                    <button
                      onClick={(e) => {
                        deleteUser(e, users.id);
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
        Add New User
      </button>
      <div
        className={`fixed mx-auto top-[30%] right-[40%] flex justify-center items-center ${
          addUserModal ? "w-[300px] h-[200px] bg-sky-300" : ""
        }`}
      >
        {addUserModal ? (
          <AddUser toggleModal={toggleModal} submitUser={submitUser} />
        ) : null}
      </div>
    </div>
  );
}

export default Users;
