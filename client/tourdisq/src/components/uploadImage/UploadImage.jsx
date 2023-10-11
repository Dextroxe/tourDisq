import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [image, setimage] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handlenext = () => {
    setPropertyDetails((prev) => ({ ...prev, image }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dl66aodkf",
        uploadPreset: "lejddnet",
        maxFiles: 1,
      },
      (err, reseult) => {
        if (reseult.event === "success") {
          setimage(reseult.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {!image ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Drag and drop your image here</span>
        </div>
      ) : (
        <div
          className="uploadedImage"
          onClick={() => widgetRef.current?.open()}
        >
          <img src={image} alt="uploaded" />
        </div>
      )}
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button disabled={!image} onClick={handlenext}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
