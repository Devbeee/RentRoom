const provinceService = require("../services/province.service");
export const getProvinces = async (req, res, next) => {
    try {
      const response = await provinceService.getProvincesService();
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Fail at province controller" + error,
      });
    }
  };