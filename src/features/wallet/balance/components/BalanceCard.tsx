import { Typography } from "components/shared/UI";
import { t } from "i18next";
import { Optional } from "types/optional";

export interface BalanceCardProps {
  balance: Optional<number>;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <div className="bg-balance bg-cover bg-center bg-no-repeat h-56 rounded-lg">
      <div className="w-full h-full backdrop-blur-[2px] flex flex-col justify-center items-center space-y-4 rounded-lg">
        <Typography variant="body-md" as="span" className="text-white">
          {t("pages.wallet.balance.your-balance")}
        </Typography>
        <Typography variant="h3" as="h4" className="text-black">
          {balance?.toFixed(2)} {t("general.dinar")}
        </Typography>
      </div>
    </div>
  );
};

export default BalanceCard;
