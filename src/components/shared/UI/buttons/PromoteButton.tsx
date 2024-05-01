import { Button, ButtonVariant } from "components/shared/UI/buttons";
import { Typography } from "components/shared/UI/index";
import { ButtonHTMLAttributes } from "react";
import {useAppDispatch} from "../../../../hooks";
import {promotionModalActions} from "../../../../features/promotion/slices/PromotionModalSlice";
import {Optional} from "../../../../types";
import { t } from "i18next";

interface promoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  propertyId: Optional<string>;
}

const PromoteButton = ({propertyId, ...otherAttr}: promoteButtonProps) => {
  const dispatch = useAppDispatch();
  const onPromote = ()=> {
    dispatch(promotionModalActions.show());
    dispatch(promotionModalActions.setPropertyId(propertyId));
  }

  return (
    <Button
      onClick={onPromote}
      variant={ButtonVariant.PRIMARY_OUTLINE}
      className="!py-1.5 !border-none"
      {...otherAttr}
    >
      <Typography variant="body-sm-bold" as="span">
        {t("property.promote")}
      </Typography>
    </Button>
  );
};

export default PromoteButton;
