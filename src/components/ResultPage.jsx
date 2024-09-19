// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { supabase } from '../lib/supabaseClient'; // Import Supabase client

// function ResultPage() {
//   const location = useLocation();
//   const [uploadStatus, setUploadStatus] = useState('Uploading...');
//   const combinedImage = location.state?.combinedImage;

//   useEffect(() => {
//     if (!combinedImage) {
//       setUploadStatus('No image found to upload.');
//       return;
//     }

//     const uploadImage = async () => {
//       const fileName = `combined-image-${Date.now()}.jpeg`;

//       try {
//         // Convert base64 to Blob for Supabase upload
//         const blob = dataURLtoBlob(combinedImage);

//         // Upload the image to Supabase storage
//         const { data, error } = await supabase.storage
//           .from('images') // 'images' is the bucket name
//           .upload(fileName, blob, {
//             contentType: 'image/jpeg',
//           });

//         if (error) {
//           throw new Error(error.message);
//         }

//         setUploadStatus('Upload successful!');
//         console.log('Uploaded combined image to Supabase!', data);

//       } catch (error) {
//         setUploadStatus('Error uploading to Supabase');
//         console.error('Error uploading to Supabase:', error);
//       }
//     };

//     uploadImage();
//   }, [combinedImage]);

//   return (
//     <div>
//       <h1>Result Page</h1>
//       {combinedImage ? (
//         <div>
//           <h2>Combined Image</h2>
//           <img src={combinedImage} alt="Combined Result" />
//         </div>
//       ) : (
//         <p>No image found to display.</p>
//       )}
//       <p>{uploadStatus}</p>
//     </div>
//   );
// }

// // Helper function to convert dataURL to Blob
// const dataURLtoBlob = (dataURL) => {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// };

// export default ResultPage;

// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { supabase } from '../lib/supabaseClient'; // Import Supabase client
// import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas

// function ResultPage() {
//   const location = useLocation();
//   const [uploadStatus, setUploadStatus] = useState('Uploading...');
//   const [imageUrl, setImageUrl] = useState(null); // State to store the public URL of the image
//   const combinedImage = location.state?.combinedImage;

//   useEffect(() => {
//     if (!combinedImage) {
//       setUploadStatus('No image found to upload.');
//       return;
//     }

//     const uploadImage = async () => {
//       const fileName = `combined-image-${Date.now()}.jpeg`;

//       try {
//         // Convert base64 to Blob for Supabase upload
//         const blob = dataURLtoBlob(combinedImage);

//         // Upload the image to Supabase storage
//         const { data, error } = await supabase.storage
//           .from('images') // 'images' is the bucket name
//           .upload(fileName, blob, {
//             contentType: 'image/jpeg',
//           });

//         if (error) {
//           throw new Error(error.message);
//         }

//         // Get the public URL for the uploaded image
//         const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`

//         setImageUrl(publicURL); // Set the public URL of the image
//         setUploadStatus('Upload successful!');

//       } catch (error) {
//         setUploadStatus('Error uploading to Supabase');
//         console.error('Error uploading to Supabase:', error);
//       }
//     };

//     uploadImage();
//   }, [combinedImage]);

//   return (
//     <div>
//       <h1>Result Page</h1>
//       {combinedImage ? (
//         <div>
//           <h2>Combined Image</h2>
//           <img src={combinedImage} alt="Combined Result" />
//         </div>
//       ) : (
//         <p>No image found to display.</p>
//       )}
//       <p>{uploadStatus}</p>

//       {imageUrl && (
//         <div>
//           <h2>QR Code for Uploaded Image</h2>
//           <QRCodeCanvas value={imageUrl} size={256} level="H" /> {/* Render QR Code with desired props */}

//         </div>
//       )}
//     </div>
//   );
// }

// // Helper function to convert dataURL to Blob
// const dataURLtoBlob = (dataURL) => {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// };

// export default ResultPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient"; // Import Supabase client
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const [uploadStatus, setUploadStatus] = useState("Uploading...");
  const [imageUrl, setImageUrl] = useState(null); // State to store the public URL of the image
  const combinedImage = location.state?.combinedImage;

  const navigate = useNavigate();

  useEffect(() => {
    if (!combinedImage) {
      setUploadStatus("No image found to upload.");
      return;
    }

    const uploadImage = async () => {
      const fileName = `combined-image-${Date.now()}.jpeg`;

      try {
        // Convert base64 to Blob for Supabase upload
        const blob = dataURLtoBlob(combinedImage);

        // Upload the image to Supabase storage
        const { data, error } = await supabase.storage
          .from("images") // 'images' is the bucket name
          .upload(fileName, blob, {
            contentType: "image/jpeg",
          });

        if (error) {
          throw new Error(error.message);
        }

        // Get the public URL for the uploaded image
        const publicURL = `https://mxyippuwkpysdexmxrbm.supabase.co/storage/v1/object/public/images/${fileName}`;

        setImageUrl(publicURL); // Set the public URL of the image
        setUploadStatus("Upload successful!");
      } catch (error) {
        setUploadStatus("Error uploading to Supabase");
        console.error("Error uploading to Supabase:", error);
      }
    };

    uploadImage();
  }, [combinedImage]);

  return (
    <div className="result-page">
      {combinedImage ? (
        <div className="image-container">
          <img
            src={combinedImage}
            alt="Combined Result"
            className="combined-image"
          />
        </div>
      ) : (
        <p>No image found to display.</p>
      )}

      {/* <p>{uploadStatus}</p> */}

      {imageUrl && (
        <div className="qr-code-container">
          <h2 className="qr-text">Scan the QR code to download your image</h2>
          <QRCodeCanvas
            value={imageUrl}
            size={250}
            level="H"
            className="qrcode"
          />{" "}
          {/* Render QR Code with desired props */}
        </div>
      )}

      <div className="capture-btn-gg">
        <button onClick={() => navigate("/")}>Home</button>
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

export default ResultPage;