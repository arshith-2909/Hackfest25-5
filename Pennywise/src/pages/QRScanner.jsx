import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRScanner = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [info, setInfo] = useState(null);
  const scannerRef = useRef(null);
  const isScanningRef = useRef(false); // Track scanning state

  useEffect(() => {
    const startScanner = async () => {
      const qrRegion = document.getElementById("qr-reader");
      if (!qrRegion) return; // Prevents null DOM access error

      scannerRef.current = new Html5Qrcode("qr-reader");

      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          const camId = devices[0].id;

          isScanningRef.current = true;

          await scannerRef.current.start(
            camId,
            { fps: 10, qrbox: 250 },
            async (decodedText) => {
              if (isScanningRef.current) {
                isScanningRef.current = false;
                await scannerRef.current.stop(); // stop safely
                setQrCodeData(decodedText);

                try {
                  const res = await fetch("http://localhost:5000/api/qrcode", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ qr: decodedText }),
                  });

                  const json = await res.json();
                  setInfo(json);
                } catch (err) {
                  console.error("API error:", err);
                }
              }
            },
            (errorMessage) => {
              console.warn("Scan error", errorMessage);
            }
          );
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current && isScanningRef.current) {
        scannerRef.current
          .stop()
          .then(() => {
            console.log("Scanner stopped");
            isScanningRef.current = false;
          })
          .catch((err) => console.log("Stop error", err));
      }
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
