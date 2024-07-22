import { memo } from "react";
function InputForm({ label, name, type, value, setValue, invalidFields }) {
  return (
    <div>
      <label htmlFor="phone" className="text-xs">
        {label}
      </label>
      <input
        type={type}
        id="phone"
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            [name]: e.target.value,
          }))
        }
      />
      {invalidFields?.length > 0 &&
        invalidFields.some((item) => item.name === name) && (
          <small className="text-red-500 italic">{invalidFields.find((item) => item.name === name)?.msg}</small>
        )}
    </div>
  );
}

export default memo(InputForm);
