import { InputForm, Button } from "../../components";
function Login() {
  return (
    <div className="bg-white w-[600px] mw-600 p-[30px] pb-[100px] rounded-md shadow-sm mt-3">
      <h3 className="font-semibold text-2xl mb-3">Đăng nhập</h3>
      <div className="w-full flex flex-col gap-5">
        <InputForm label={"SỐ ĐIỆN THOẠI"} />
        <InputForm label={"MẬT KHẨU"} />
        <Button
          text={"Đăng nhập"}
          bgColor={"bg-secondary"}
          textColor={"text-white"}
          fullWidth
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        <small className="text-[blue] hover:text-[red] cursor-pointer">Bạn quên mật khẩu</small>
        <small className="text-[blue] hover:text-[red] cursor-pointer">Tạo tài khoản mới</small>
      </div>
    </div>
  );
}

export default Login;
