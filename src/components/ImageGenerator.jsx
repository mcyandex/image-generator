import React, { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Bounce, toast } from "react-toastify";
import default_image from "../assets/default_image.svg";
import "./ImageGenerator.scss";

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openai.com/v1/images/generations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: inputRef.current.value,
            n: 1,
            size: "256x256",
          }),
        }
      );
      let data = await response.json();
      if (data.error) {
        toast.error(data.error.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.success("Image loaded successfully", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        let dataArray = data.data;
        setImageUrl(dataArray[0].url);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    inputRef.current.value = "";
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? default_image : imageUrl} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <div
          className={`generate-btn ${loading ? "disable" : ""}`}
          onClick={() => imageGenerator()}
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="70"
              width="70"
              color="#de1b89"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Generate"
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
