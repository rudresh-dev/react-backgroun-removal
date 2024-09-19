import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const CLIPDROP_API_KEY =
  "c962c39d9a6f890e9e70f4751c2ac3d7a968b2cacf444eb1b5bdfa3988ceac5b6198ddf56f451ca755aceb6b35f42686"; // Replace with your actual API key

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user",
};

function PhotoPage() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [countdown, setCountdown] = useState(null); // State for countdown
 // Capture image after countdown
 useEffect(() => {
  if (countdown === 0) {
    handleStartCapture(); // Trigger image capture when countdown finishes
    setCountdown(null); // Reset countdown to hide it
  }
}, [countdown]);

  // Start the 3-2-1 countdown
  const startCountdown = () => {
    setCountdown(3); // Set countdown to 3 initially
    let count = 3;
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval); // Stop countdown when it reaches 0
      }
    }, 1000);
  };

  // Capture image from webcam
  const handleStartCapture = () => {
    setProcessing(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      console.log("Image captured:", imageSrc);
      setCapturedImage(imageSrc);
      processBackgroundRemoval(imageSrc);
    }
  };

  // Call ClipDrop API to remove background
  const processBackgroundRemoval = (imageSrc) => {
    const blob = dataURLtoBlob(imageSrc);
    const formData = new FormData();
    formData.append("image_file", blob);

    fetch("https://clipdrop-api.co/remove-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": CLIPDROP_API_KEY,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const base64Image = arrayBufferToBase64(buffer);
        const processedImageData = `data:image/png;base64,${base64Image}`;
        if (processedImageData) {
          console.log("Processed image:", processedImageData);
          setProcessedImage(processedImageData);
          setShowPresets(true);
        }
        setProcessing(false);
      })
      .catch((error) => {
        console.error("Error during background removal:", error);
        setProcessing(false);
      });
  };

  //   // Combine background and processed images
  //   const combineImages = async (backgroundImageSrc) => {
  //     return new Promise((resolve, reject) => {
  //       const canvas = canvasRef.current;
  //       const ctx = canvas.getContext('2d');
  //       const background = new Image();
  //       const foreground = new Image();

  //       background.src = backgroundImageSrc;
  //       foreground.src = processedImage;

  //       background.onload = () => {
  //         ctx.clearRect(0, 0, canvas.width, canvas.height);
  //         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  //         foreground.onload = () => {
  //           ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);
  //           const combinedImage = canvas.toDataURL('image/jpeg');
  //           console.log("Combined Image:", combinedImage);
  //           resolve(combinedImage);
  //         };
  //         foreground.onerror = reject;
  //       };
  //       background.onerror = reject;
  //     });
  //   };

  // Combine background and processed images
  const combineImages = async (backgroundImageSrc) => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const background = new Image();
      const foreground = new Image();

      background.src = backgroundImageSrc;
      foreground.src = processedImage;

      background.onload = () => {
        // Set canvas size to match background image
        canvas.width = background.width;
        canvas.height = background.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        foreground.onload = () => {
          // Draw the foreground image at the bottom keeping aspect ratio
          const aspectRatio = foreground.width / foreground.height;
          const targetWidth = canvas.width;
          const targetHeight = targetWidth / aspectRatio;

          // Place the foreground image at the bottom
          const offsetY = canvas.height - targetHeight; // Align at the bottom

          ctx.drawImage(foreground, 0, offsetY, targetWidth, targetHeight);
          const combinedImage = canvas.toDataURL("image/jpeg", 1.0); // Max quality
          console.log("Combined Image:", combinedImage);
          resolve(combinedImage);
        };
        foreground.onerror = reject;
      };
      background.onerror = reject;
    });
  };
  // Handle next button click
  // Handle next button click
  const handleNext = async () => {
    if (!processedImage || !backgroundImage) {
      alert("Please complete the image processing.");
      return;
    }

    try {
      const combinedImage = await combineImages(backgroundImage);
      navigate("/result", { state: { combinedImage } });
    } catch (error) {
      console.error("Error combining images:", error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={1920}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1080}
        videoConstraints={videoConstraints}
        style={{
          objectFit: "fill",
        }}
      />
      <canvas
        ref={canvasRef}
     
        style={{ display: "none" }}
      ></canvas>

      <div className="gg88" style={{ position: "absolute", bottom: "10px" }}>
   
          {countdown !== null && (
                 <div className="coutdowm">
            <h1 className="" style={{ fontSize: "190px" }}>
              {countdown}
            </h1>
            </div>
          )}
        {/* Show capture button first */}
        {!showPresets && (
          <div className="capture-btn-gg">
            <button onClick={startCountdown}>Capture</button>
          </div>
        )}

        {/* Show preset selection and apply button after capture */}
        {showPresets && (
          <div className="preset-container">
            <div className="preset-container-box">
              <button onClick={() => setBackgroundImage("/wal/1.png")}>
                Preset 1
              </button>
              <button onClick={() => setBackgroundImage("/wal/2.png")}>
                Preset 2
              </button>
              <button onClick={() => setBackgroundImage("/wal/3.png")}>
                Preset 3
              </button>
              <button onClick={() => setBackgroundImage("/wal/4.png")}>
                Preset 4
              </button>
              <button onClick={() => setBackgroundImage("/wal/5.png")}>
                Preset 5
              </button>
              <button onClick={() => setBackgroundImage("/wal/6.png")}>
                Preset 6
              </button>
            </div>
            <div className="capture-btn-gg">
              <button
                onClick={handleNext}
                disabled={processing || !processedImage}
              >
                Apply Background
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to convert dataURL to Blob
const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

// Helper function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export default PhotoPage;