import { Html5Qrcode } from "html5-qrcode";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { paymentAtom, qrMessageAtom } from "../../store/store";
import qrCodeIcon from "../../assets/images/icons/qr-white.svg";
import galleryIcon from "../../assets/images/icons/gallery.svg";
import crosssIcon from "../../assets/images/icons/cross-white.svg";
import { useNavigate } from "react-router-dom";
import { capitalizeName } from "../../constants/utils";

const QrPage: FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [_, setQrMessage] = useAtom(qrMessageAtom);
  const navigate = useNavigate();

  // console.log(
  //   decodeURIComponent(
  //     "%D0%90%D0%91%D0%94%D0%A3%D0%9B%D0%90%D0%97%D0%98%D0%9C%20%D0%9A."
  //   )
  // );

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 200, height: 200 },
      aspectRatio: 4 / 3,
    };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop();
      }
    };

    const qrCodeSuccess = (decodedText: string) => {
      const fullname = decodeURIComponent(decodedText.slice(83).split(".")[0]);
      if (decodedText.match(/app.mbank.kg/i)) {
        setPayment({
          ...payment,
          phone: +decodedText.slice(70, 79),
          name: `${capitalizeName(fullname.split(" ")[0])} ${
            fullname.split(" ")[1]
          }.`,
        });
      }
      setQrMessage(decodedText);
      setIsEnabled(false);
      navigate("/transfer-by-phone2");
    };

    if (isEnabled) {
      // @ts-ignore
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess);
      setQrMessage("");
    } else {
      qrScanerStop();
    }

    return () => {
      qrScanerStop();
    };
  }, [isEnabled]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <div
        id="qrCodeContainer"
        className="relative rounded-[7px] w-full h-full overflow-hidden flex justify-center items-center [&_#qr-shaded-region]:!border-[0px] [&_#qr-shaded-region]:w-[300px] [&_#qr-shaded-region]:h-[300px] [&_#qr-shaded-region]:!top-[50%] [&_#qr-shaded-region]:!translate-y-[-50%] [&_#qr-shaded-region]:!left-[50%] [&_#qr-shaded-region]:!translate-x-[-50%]"
      ></div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-[40px] right-[15px]"
      >
        <img src={crosssIcon} alt="cross" className="w-[20px]" />
      </button>
      <span className="absolute top-[100px] text-center font-bold">
        Наведите камеру <br /> на QR или штрих код
      </span>
      <div className="absolute left-[15px] right-[15px] bottom-[30px] flex gap-[15px] justify-center">
        <button className="rounded-[16px] py-[7px] flex-[0_1_200px] flex justify-center gap-[10px] items-center bg-white text-black font-semibold">
          <span>Мой QR</span>
          <img src={qrCodeIcon} alt="qr-code" className="w-[17px]" />
        </button>
        <button className="rounded-[16px] py-[7px] flex-[0_1_200px] flex justify-center gap-[10px] items-center bg-white text-black font-semibold">
          <span>Из галереи</span>
          <img src={galleryIcon} alt="qr-code" className="w-[17px]" />
        </button>
      </div>
    </div>
  );
};

export default QrPage;
