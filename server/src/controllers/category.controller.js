import * as categoryService from "../services/category.service";

export const getCategories = async (req, res, next) => {
  try {
    const response = await categoryService.getCategoriesService();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      err: -1,
      msg: "Failed at category controller" + error,
    });
  }
};
