import React from "react";
import { text } from "../../utils/constant";
import { Province } from "../../components";
import {List, Pagination} from "./index"
import { useSearchParams } from "react-router-dom";
const HomePage = () => {
  const [params] = useSearchParams();
  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List page={params.get('page')}/>
          <Pagination page={params.get('page')}/>
        </div>
        {/* <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
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
          <RelatedPost />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
