import { Typography } from "components/shared/UI";
import { Link } from "react-router-dom";
import { Optional } from "types/optional";

interface VideoTitleProps {
  title: Optional<string>;
  link: Optional<string>;
}

const VideoTitle = ({ title, link }: VideoTitleProps) => {
  return (
    <Typography variant="h4" as="h3" className="capitalize">
      <Link to={link || ""}>{title}</Link>
    </Typography>
  );
};

export default VideoTitle;
