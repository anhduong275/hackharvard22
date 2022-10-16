import React, { useCallback, useEffect, useState } from "react";
import supabase from "./supabase";

type ChangeFamilyNameProps = {
  submitFamilyName: (user: any) => Promise<void>;
  setFamilyName: React.Dispatch<React.SetStateAction<string>>;
  familyName: string;
};

const ChangeFamilyName: React.FC<ChangeFamilyNameProps> = ({
  submitFamilyName,
  setFamilyName,
  familyName,
}) => {
  const handleInputChange = (e: any) => {
    const target = e.target;
    setFamilyName(target.familyName);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      user: { value: string };
    };
    await submitFamilyName(formElements.familyname.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block p-2">
          Family name:
          <input
            className="mx-2"
            type="text"
            name="familyname"
            defaultValue={familyName}
            value={familyName}
            onChange={handleInputChange}
          />
        </label>
        <input
          type="submit"
          value="Change name"
          className="text-white bg-sky-500 p-2 m-2 hover:cursor-pointer"
        />
      </form>
    </div>
  );
};

export default ChangeFamilyName;
