import React from "react";

const InputReadOnly = ({ label, value, changer }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium" htmlFor="exactly-address">
        {label}
      </label>
      <div>
        <input
          type="text"
          id="exactly-address"
          readOnly
          className="border border-gray-200 outline-none rounded-md bg-gray-100 p-2 w-full"
          value={value || ""}
        />
        {changer && (
          <small className="text-blue-500 cursor-pointer">Đổi {label.toLowerCase()}</small>
        )}
      </div>
    </div>
  );
};

export default InputReadOnly;
