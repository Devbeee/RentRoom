import React, { useEffect, useState,memo } from "react";
import { Select } from "../components";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../services";

const Address = ({ setPayload }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState("");
  const [districtSelect, setDistrictSelect] = useState("");
  const [reset, setReset] = useState(false)

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrictSelect('');
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(provinceSelect);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    provinceSelect && fetchPublicDistrict();
    !provinceSelect ? setReset(true) : setReset(false)
    !provinceSelect && setDistricts([]);
  }, [provinceSelect]);
  useEffect(() => {
    setPayload(prev => ({
        ...prev,
        address: `${districtSelect ? `${districts?.find(item => item.district_id === districtSelect)?.district_name},` : ''} ${provinceSelect ? provinces?.find(item => item.province_id === provinceSelect)?.province_name : ''}`,
        province: provinceSelect ? provinces?.find(item => item.province_id === provinceSelect)?.province_name : ''
    }))

}, [provinceSelect, districtSelect])
  return (
    <div>
      <h2 className="font-semibold text-xl p-4">Địa chỉ cho thuê:</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            value={provinceSelect}
            setValue={setProvinceSelect}
            options={provinces}
            label={"Tỉnh/Thành phố"}
            type="province"
          />
          <Select
            value={districtSelect}
            setValue={setDistrictSelect}
            options={districts}
            label={"Quận/huyện"}
            type="district"
            reset={reset} 
          />
        </div>
        <div>
          <label htmlFor="exactly-address">Địa chỉ chính xác</label>
          <input
            id="exactly-address"
            value={`${districtSelect ? `${districts?.find(item => item.district_id === districtSelect)?.district_name},` : ''} ${provinceSelect ? provinces?.find(item => item.province_id === provinceSelect)?.province_name : ''}`}
            type="text"
            readOnly
            className="border border-gray-200 rounded-md bg-gray-100 p-2 w-full outline-none hover:cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Address);
