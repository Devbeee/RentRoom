import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { apiVerifyOTP } from "../../services";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";
const OTPVerification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  useEffect(() => {
    isLoggedIn && redirectHome();
  }, [isLoggedIn]);
  useEffect(() => {
    inputs.current[0].focus();
  }, []);
  const redirectHome = () => {
    let timerInterval;
    Swal.fire({
      title: "Xác thực thành công",
      html: "Bạn sẽ được chuyển đến trang chủ sau 1s",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        localStorage.removeItem("phoneNumber");
        navigate("/");
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);
    if (digits.length === otp.length) {
      inputs.current[otp.length - 1].focus();
    } else {
      inputs.current[digits.length].focus();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      phoneNumber:
        location?.state?.phoneNumber || localStorage.getItem("phoneNumber"),
      otp: otp.join(""),
    };
    if (payload?.otp?.length === 4) {
      dispatch(actions.verifyOTP(payload));
    } else {
      Swal.fire({
        title: "Thất bại",
        text: "Bạn chưa nhập đầy đủ OTP",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow m-2">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Xác thực tài khoản</h1>
        <p className="text-[15px] text-slate-500">
          Một mã otp 4 chữ số đã gửi qua cuộc gọi.
          <br />
          Vui lòng nhập vào ô bên dưới
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={handleFocus}
              onPaste={handlePaste}
              ref={(el) => (inputs.current[index] = el)}
              maxLength="1"
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Xác nhận
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Bạn chưa nhận được otp?
        <button
          className="font-medium text-indigo-500 hover:text-indigo-600"
          href="#0"
        >
          Gửi lại
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
