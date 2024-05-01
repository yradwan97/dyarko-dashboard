import { Optional } from "types/optional";
import { Typography } from "components/shared/UI";
import { t } from "i18next";

export interface PointsCardProps {
  points: Optional<number>;
  amount: Optional<number>;
}

const PointsCard = ({ points, amount }: PointsCardProps) => {
  return (
    <div className="bg-points bg-cover bg-center bg-no-repeat h-56 rounded-lg">
      <div className="w-full h-full backdrop-blur-[2px] flex flex-col justify-center items-center space-y-4 rounded-lg">
        <Typography variant="body-md" as="span" className="text-white">
          Total Points
        </Typography>
        <Typography variant="h3" as="h4" className="text-black">
          {`${points?.toFixed(3) || 0}`} {t("general.points")}
        </Typography>
      </div>
    </div>
  );
};

export default PointsCard;
