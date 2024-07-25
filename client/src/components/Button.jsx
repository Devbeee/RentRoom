import { memo } from "react";
function Button({
  text,
  textColor,
  bgColor,
  fullWidth,
  Icon,
  onClick,
  icBefore,
  icAfter,
}) {
  return (
    <button
      type="button"
      className={`py-2 
        px-4 
        ${textColor} 
        ${bgColor} 
        outline-none 
        rounded-md 
        hover:underline 
        flex 
        items-center 
        justify-center 
        gap-1
        ${fullWidth && "w-full"}
        `}
      onClick={onClick}
    >
      {icBefore && <Icon />}
      {text}
      {icAfter && <Icon />}
    </button>
  );
}

export default memo(Button);
