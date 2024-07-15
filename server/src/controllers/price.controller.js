const priceService = require("../services/price.service");
export const getPrices = async (req, res, next) => {
    try {
      const response = await priceService.getPricesService();
  
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Fail at price controller" + error,
      });
    }
  };