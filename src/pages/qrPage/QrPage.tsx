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
    const config = {
      fps: 10,
      qrbox: { width: 200, height: 200 },
      aspectRatio: 9 / 18,
    };
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
    </div>
  );
};

export default QrPage;
