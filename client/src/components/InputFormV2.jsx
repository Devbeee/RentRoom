import React from "react";

const InputFormV2 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  invalidFields,
  direction,
}) => {
  return (
    <div>
      <label className="" htmlFor="title">{label}</label>
      <div className="flex items-center mt-2">
        <input
          type="text"
          id=" title"
          className={`${
            unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
          } outline-none border flex-auto border-gray-300 p-2`}
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
        />
        {unit && (
          <span className="p-2 border flex-none w-16 flex items-center justify-center rounded-tr-md rounded-br-md bg-gray-200">
            {unit}
          </span>
        )}
      </div>
      {small && <small className="opacity-70">{small}</small>}
      {invalidFields?.length > 0 &&
        invalidFields.some((item) => item.name === name) && (
          <small className="text-red-500 italic block">
            {invalidFields.find((item) => item.name === name)?.msg}
          </small>
        )}
    </div>
  );
};

export default InputFormV2;
