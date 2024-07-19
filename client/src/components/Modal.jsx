import React, { useState, useEffect } from "react";
import icons from "../utils/icons";
import { getNumbersPrice, getNumbersArea } from "../utils/getNumbers";
import { getCodes, getCodesArea } from "../utils/getCodes";

const { GrLinkPrevious } = icons;
const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmit,
  defaultText,
  queries,
  arrMinMax,
}) => {
  const [percent1, SetPercent1] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  );
  const [percent2, SetPercent2] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  );
  const [activeEl, setActiveEl] = useState("");
  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (percent2 <= percent1) {
        activedTrackEl.style.left = `${percent2}%`;
        activedTrackEl.style.right = `${100 - percent1}%`;
      } else {
        activedTrackEl.style.left = `${percent1}%`;
        activedTrackEl.style.right = `${100 - percent2}%`;
      }
    }
  }, [percent1, percent2]);
  const handleClickTrack = (e, value) => {
    const stackEl = document.getElementById("track");
    const stackRect = stackEl.getBoundingClientRect();
    let percent = value
      ? value
      : Math.round(((e.clientX - stackRect.left) * 100) / stackRect.width, 0);
    if (Math.abs(percent - percent) <= Math.abs(percent - percent2)) {
      SetPercent1(percent);
    } else {
      SetPercent2(percent);
    }
  };
  const convert100toTarget = (percent) => {
    return name === "price"
      ? Math.ceil(percent * 0.15)
      : name === "area"
      ? Math.ceil(percent * 0.9)
      : 0;
  };
  const convertTo100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };
  const handleActive = (code, value) => {
    setActiveEl(code);
    let arrMaxMin =
      name === "price" ? getNumbersPrice(value) : getNumbersArea(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        SetPercent1(0);
        SetPercent2(convertTo100(1));
      }
      if (arrMaxMin[0] === 20) {
        SetPercent1(0);
        SetPercent2(convertTo100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        SetPercent1(100);
        SetPercent2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      SetPercent1(convertTo100(arrMaxMin[0]));
      SetPercent2(convertTo100(arrMaxMin[1]));
    }
  };
  const handleBeforeSubmit = (e) => {
    e.stopPropagation();
    let min = percent1 <= percent2 ? percent1 : percent2;
    let max = percent1 <= percent2 ? percent2 : percent1;
    let arrMinMax = [convert100toTarget(min), convert100toTarget(max)];
    // const gaps =
    //   name === "price"
    //     ? getCodes(arrMinMax, content)
    //     : name === "area"
    //     ? getCodesArea(arrMinMax, content)
    //     : [];
    handleSubmit(
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} - ${convert100toTarget(max)} ${
          name === "price" ? "triệu" : "m2"
        }`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };
  return (
    <div
      onClick={(e) => {
        setIsShowModal(false);
      }}
      className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-20 bg-overlay-70"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <span
            className="hover:text-red-600 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsShowModal(false);
            }}
          >
            <GrLinkPrevious size={24} />
          </span>
        </div>
        <div className="p-4 flex flex-col">
          {(name === "category" || name === "province") && (
            <>
              <div className="py-2 flex gap-2 items-center border-b border-gray-200">
                <input
                  type="radio"
                  name={name}
                  value={defaultText || ""}
                  id="default"
                  checked={!queries[`${name}Code`] ? true : false}
                  onChange={(e) =>
                    handleSubmit(e, {
                      [name]: defaultText,
                      [`${name}Code`]: null,
                    })
                  }
                />
                <label htmlFor="default">{defaultText}</label>
              </div>
              {content?.map((item) => (
                <div
                  className="p-2 flex gap-2 items-center cursor-pointer border-b border-gray-200"
                  key={item.code}
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmit({
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      });
                    }}
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </div>
              ))}
            </>
          )}
          {(name === "price" || name === "area") && (
            <div className="p-12 py-20">
              <div className="flex flex-col items-center justify-center relative">
                <div className="z-30 absolute top-[-48px] font-bold text-xl text-orange-600">
                  {percent1 === 100 && percent2 === 100
                    ? `Trên ${convert100toTarget(percent1)} ${
                        name === "price" ? "triệu" : "m2"
                      } +`
                    : `Từ ${
                        percent1 <= percent2
                          ? convert100toTarget(percent1)
                          : convert100toTarget(percent2)
                      } - ${
                        percent2 >= percent1
                          ? convert100toTarget(percent2)
                          : convert100toTarget(percent1)
                      } ${name === "price" ? "triệu" : "m2"}`}
                </div>
                <div
                  id="track"
                  onClick={handleClickTrack}
                  className="slider-track h-[5px] absolute bg-gray-300 rounded-full w-full top-0 bottom-0"
                ></div>
                <div
                  id="track-active"
                  onClick={handleClickTrack}
                  className="slider-track-active h-[5px] absolute bg-orange-600 rounded-full top-0 bottom-0 right-0"
                ></div>

                <input
                  type="range"
                  max={100}
                  min={0}
                  step={1}
                  value={percent1}
                  onChange={(e) => {
                    SetPercent1(+e.target.value);
                    activeEl && setActiveEl("");
                  }}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                />
                <input
                  type="range"
                  max={100}
                  min={0}
                  step={1}
                  value={percent2}
                  onChange={(e) => {
                    SetPercent2(+e.target.value);
                    activeEl && setActiveEl("");
                  }}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                />
                <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTrack(e, 0);
                    }}
                  >
                    0
                  </span>
                  <span
                    className="mr-[-12px] cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTrack(e, 100);
                    }}
                  >
                    {name === "price"
                      ? "15 triệu +"
                      : name === "area"
                      ? "Trên 90 m2"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="mt-24">
                <h4 className="font-medium mb-4">Chọn nhanh:</h4>
                <div className="flex items-center gap-2 flex-wrap w-full ">
                  {content?.map((item) => (
                    <span
                      onClick={() => handleActive(item.code, item.value)}
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        item.code === activeEl
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      key={item.code}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {name !== "province" && (
          <button
            onClick={handleBeforeSubmit}
            type="button"
            className="w-full bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md uppercase absolute bottom-0"
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
