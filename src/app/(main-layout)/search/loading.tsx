"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <DotLottieReact
        src="https://lottie.host/23be50a5-0ed2-4c71-91c4-8865b656cb91/Qnkhz7Yf5Q.lottie"
        loop
        autoplay
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default Loader;
