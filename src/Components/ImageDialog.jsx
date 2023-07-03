import { Card, CardContent, CardMedia, Dialog, Typography } from "@mui/material";

import { useParams } from "../Utils/context";

import { cardContentStyles, cardMediaStyles, cardStyles } from "../styles/ImageDialogStyles";

const ImageDialog = () => {
  const { images, imageIndex, open, setOpen } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  if (images.length === 0) {
    return;
  }

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={false}>
      <Card sx={cardStyles}>
        <CardMedia
          component={"img"}
          sx={cardMediaStyles}
          src={images[imageIndex].urls.regular}
          alt={images[imageIndex].alt_description}
        />
        <CardContent style={cardContentStyles}>
          <Typography component={"p"}>
            Photo by{" "}
            <a
              href={`${images[imageIndex].user.links.html}?utm_source=Around the world&utm_medium=referral`}
              target="_blank">
              {images[imageIndex].user.name}
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/?utm_source=Around the world&utm_medium=referral" target="_blank">
              Unsplash
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default ImageDialog;
