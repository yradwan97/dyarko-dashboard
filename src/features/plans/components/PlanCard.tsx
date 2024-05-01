import { Button, Typography } from "components/shared/UI";
import { ButtonVariant } from "components/shared/UI/buttons";
import { BuyablePlan, PlanItem } from "features/plans";

export interface PlanCardProps {
  plan: BuyablePlan;
  onBuyClick: any;
}

const PlanCard = ({ plan, onBuyClick }: PlanCardProps) => {
  return (
    <div className="bg-white border border-white hover:bg-main-100 hover:border-main-600 rounded-lg flex-1 p-4">
      <div className="h-36">
        <img
          className="w-full h-full object-cover"
          src={plan.logo}
          alt={plan.name}
        />
      </div>
      <Typography
        variant="body-lg-bold"
        as="h4"
        className="text-gary-900 capitalize my-3"
      >
        {plan.name}
      </Typography>
      <Typography variant="h2" as="h2" className="text-black">
        ${plan.amount}
      </Typography>
      <div className="my-8 space-y-6">
        <PlanItem disabled={!plan.propertiesNumber}>
          Properties Number: {plan.propertiesNumber}
        </PlanItem>
        <PlanItem disabled={!plan.searchFeatureLimit}>
          Search Feature Limit: {plan.searchFeatureLimit}
        </PlanItem>
        <PlanItem disabled={!plan.featuredPropertyLimit}>
          Featured Properties Limit: {plan.featuredPropertyLimit}
        </PlanItem>
        <PlanItem disabled={!plan.searchFeatureProperties24}>
          Search Feature Properties (24h): {plan.searchFeatureProperties24}
        </PlanItem>
        <PlanItem disabled={!plan.searchFeatureProperties48}>
          Search Feature Properties (48h): {plan.searchFeatureProperties48}
        </PlanItem>
        <PlanItem disabled={!plan.homeFeatureProperties24}>
          Home Feature Properties (24h): {plan.homeFeatureProperties24}
        </PlanItem>
        <PlanItem disabled={!plan.homeFeatureProperties48}>
          Home Feature Properties (48h): {plan.homeFeatureProperties48}
        </PlanItem>
      </div>
      <div className="flex flex-col">
        <Button
          variant={ButtonVariant.PRIMARY}
          onClick={() => onBuyClick(plan.id)}
        >
          buy
        </Button>
      </div>
    </div>
  );
};

export default PlanCard;
