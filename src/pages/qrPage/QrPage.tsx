import { Html5Qrcode } from "html5-qrcode";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { qrMessageAtom } from "../../store/store";
// import { useNavigate } from "react-router-dom";

const QrPage: FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [_, setQrMessage] = useAtom(qrMessageAtom);
  // const navigate = useNavigate();

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop();
      }
    };

    const qrCodeSuccess = (decodedText: string) => {
      setQrMessage(decodedText);
      setIsEnabled(false);
      console.log(decodedText);
    };

    if (isEnabled) {
      // @ts-ignore
      html5QrCode.start({ facingMode: "user" }, config, qrCodeSuccess);
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
        className="relative rounded-[7px] w-[300px] h-[300px] overflow-hidden [&_#qr-shaded-region]:!border-[50px]"
      ></div>
    </div>
  );
};

export default QrPage;
