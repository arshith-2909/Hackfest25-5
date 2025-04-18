// QRScanner.jsx
import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");

    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const camId = devices[0].id;
        scanner.start(
          camId,
          {
            fps: 10,
            qrbox: 250,
          },
          async (decodedText) => {
            scanner.stop(); // stop after first successful scan
            setQrCodeData(decodedText);

            const res = await fetch("http://localhost:5000/api/qrcode", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ qr: decodedText }),
            });

            const json = await res.json();
            setInfo(json);
          },
          (errorMessage) => {
            console.warn("Scan error", errorMessage);
          }
        );
      }
    });

    return () => {
      scanner
        .stop()
        .then(() => console.log("Scanner stopped"))
        .catch((err) => console.log("Stop error", err));
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">QR Code Scanner</h2>
      <div id="qr-reader" style={{ width: "500px" }}></div>

      {qrCodeData && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg">QR Code Result:</h3>
          <p>{qrCodeData}</p>
        </div>
      )}

      {info && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg">Decoded Info:</h3>
          <p><strong>Name:</strong> {info.name}</p>
          <p><strong>Message:</strong> {info.message}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
