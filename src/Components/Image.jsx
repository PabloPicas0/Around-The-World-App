import { ImageListItem, Skeleton } from "@mui/material";
import { useState } from "react";
import { useParams } from "../Utils/context";

const Image = (props) => {
  const { setImageIndex, setOpen, setIsLoading } = useParams();

  const { src, alt, index } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  const handleImage = (idx) => {
    setImageIndex(idx);
    setIsLoading(true);
    setOpen(true);
  };

  return (
    <ImageListItem
      sx={{ border: "1px solid #616161", cursor: "pointer", overflowY: "hidden" }}
      onClick={() => handleImage(index)}>
      {!isLoaded && <Skeleton variant="rectangular" height={"100%"} />}
      <img src={src} alt={alt} onLoad={() => setIsLoaded(true)} />
    </ImageListItem>
  );
};

export default Image;
