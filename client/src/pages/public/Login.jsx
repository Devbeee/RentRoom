import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputForm, Button } from "../../components";
function Login() {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  useEffect(() => {
    const currentPathname = location.state?.flag ? "/register" : "/login";
    window.history.pushState({}, "", currentPathname);
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);
  return (
    <div className="bg-white w-[600px] mw-600 p-[30px] pb-[100px] rounded-md shadow-sm mt-3">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && <InputForm label={"HỌ TÊN"} />}
        <InputForm label={"SỐ ĐIỆN THOẠI"} />
        <InputForm label={"MẬT KHẨU"} />
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor={"bg-secondary"}
          textColor={"text-white"}
          fullWidth
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?
            <span
              className="text-blue-500 hover:underline cursor-pointer ml-1"
              onClick={() => setIsRegister(false)}
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu
            </small>
            <small
              className="text-[blue] hover:text-[red] cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
