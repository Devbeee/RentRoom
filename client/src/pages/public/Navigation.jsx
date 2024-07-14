import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import  formatVietnameseToString from "../../utils/formatVietnameseToString";
import { apiGetCategories } from "../../services/category.service";

const notActive =
  "hover:bg-third px-4 h-full flex items-center bg-secondary";
const active = "hover:bg-third px-4 h-full flex items-center  bg-third";

const Navigation = ({ isAdmin }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
     
      if (response?.data.err === 0) {
        setCategories(response?.data?.response);
      }
    };
    fetchCategories();
  },[]);
  return (
    <div
      className={`w-full flex ${
        isAdmin ? "justify-start" : "justify-center"
      } items-center h-[40px] bg-secondary text-white`}
    >
      <div className="w-3/5 flex h-full items-center text-sm font-medium">
        <NavLink
          to={`/`}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            return (
              <div
                key={item.code}
                className="h-full flex justify-center items-center"
              >
                <NavLink
                  to={`/${formatVietnameseToString(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
