import React, { useState } from "react";

type AddUserProps = {
  toggleModal: (e: any) => void;
  submitUser: (task: any) => void;
};

const AddUser: React.FC<AddUserProps> = ({ toggleModal, submitUser }) => {
  const [user, setUser] = useState("");
  const handleInputChange = (e: any) => {
    const target = e.target;
    setUser(target.user);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      user: { value: string };
    };
    await submitUser(formElements.user.value);
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
          User:
          <input
            type="text"
            name="user"
            value={user}
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

export default AddUser;