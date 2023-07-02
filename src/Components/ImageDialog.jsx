import { Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Slide, Typography } from "@mui/material";
import { useParams } from "../Utils/context";

const ImageDialog = () => {
  const { images, imageIndex, open, setOpen } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog onClose={handleClose} open={open}>
        {`test nr ${imageIndex}`}
      </Dialog>
  );
};

export default ImageDialog;
