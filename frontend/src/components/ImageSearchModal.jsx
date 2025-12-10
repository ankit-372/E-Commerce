import { useState, useRef } from "react";
import { X, Camera, ImageIcon, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useImageSearchStore } from "../stores/useImageSearchStore";

const ImageSearchModal = ({ close }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const setResults = useImageSearchStore((state) => state.setResults);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 📌 Upload from Gallery
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  // 📌 Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Camera error:", error);
      alert("Camera access denied or unavailable.");
    }
  };

  // 📌 Capture Photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataURL = canvas.toDataURL("image/png");
    setSelectedImage(dataURL);
  };

  // 📌 Send Image → Backend
  const searchProducts = async () => {
    if (!selectedImage) return alert("No image selected!");

    setLoading(true);

    const blob = await fetch(selectedImage).then((r) => r.blob());
    const file = new File([blob], "image.png");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/ai/image-search", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setResults(data.results); // store globally
      close(); // close modal
      navigate("/image-results"); // redirect
    } else {
      alert("No similar products found.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-white hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Search by Image</h2>

        {/* Upload From Gallery */}
        <label className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg cursor-pointer mb-3 hover:bg-gray-700">
          <ImageIcon className="text-blue-400" />
          <span className="text-gray-200">Upload From Gallery</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Open Camera */}
        <button
          onClick={startCamera}
          className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg w-full hover:bg-gray-700 mb-3"
        >
          <Camera className="text-pink-400" />
          <span className="text-gray-200">Open Camera</span>
        </button>

        {/* Camera Feed */}
        <video ref={videoRef} className="w-full rounded-lg mb-3"></video>

        {/* Capture Button */}
        <button
          onClick={capturePhoto}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg mb-4"
        >
          Capture Photo
        </button>

        {/* Preview Selected Image */}
        {selectedImage && (
          <img
            src={selectedImage}
            className="w-full rounded-lg mb-4"
            alt="Preview"
          />
        )}

        {/* Find Similar Products */}
        <button
          onClick={searchProducts}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          disabled={loading}
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Find Similar Products"
          )}
        </button>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default ImageSearchModal;
