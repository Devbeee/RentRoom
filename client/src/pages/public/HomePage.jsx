import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import * as actions from "../../store/actions";
import { text } from "../../utils/constant";
import { Province, ItemSidebar } from "../../components";
import { List, Pagination } from "./index";
const HomePage = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const { categories, prices, areas } = useSelector((state) => state.app);
  useEffect(() => {   
    dispatch(actions.GetPrices());
    dispatch(actions.GetAreas());
  }, []);
  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar
            isDouble={true}
            type="priceCode"
            content={prices}
            title="Xem theo giá"
          />

          <ItemSidebar
            isDouble={true}
            type="areaCode"
            content={areas}
            title="Xem theo diện tích"
          />
          {/* <RelatedPost /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
