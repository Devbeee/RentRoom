const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fields = Object.entries(payload);
  fields.forEach((item) => {
    if (item[1] === "") {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          msg: "Bạn không được bỏ trống trường này",
        },
      ]);
      invalids++;
    }
  });
  fields.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Mật khẩu phải có tối thiểu 6 ký tự",
            },
          ]);
          invalids++;
        }
        break;
      case "phone":
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!item[1].match(regexPhoneNumber)) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Số điện thoại không hợp lệ",
            },
          ]);
          invalids++;
        }
        break;
      case "priceNumber":
      case "areaNumber":
        if (+item[1] === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Chưa đặt giá trị cho trường này",
            },
          ]);
          invalids++;
        } else if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              msg: "Trường này phải là số",
            },
          ]);
          invalids++;
        }
        break;
      default:
        break;
    }
  });
  return invalids;
};
export default validate;
