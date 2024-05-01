import { Typography } from "components/shared/UI";
import { t } from "i18next";
import { useState } from "react";

interface VideoDescriptionProps {
  children: string;
  maxChars: number;
}

const VideoDescription = ({ children, maxChars }: VideoDescriptionProps) => {
  const [expanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prevValue) => !prevValue);
  const isExceededMaxChars = children.length > maxChars;

  return (
    <div className="flex flex-col space-y-3 items-start">
      <Typography
        variant="body-md-medium-tall"
        as="p"
        className="text-gray-500"
      >
        {children}
      </Typography>

      <button onClick={toggleExpand}>
        <Typography
          variant="body-md-medium-tall"
          as="span"
          className="text-gray-400 capitalize"
        >
          {t("general.read-more")}
        </Typography>
      </button>
    </div>
  );
};

export default VideoDescription;
