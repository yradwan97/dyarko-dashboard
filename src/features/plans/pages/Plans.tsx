import { useState } from "react";
import { useGetPlans } from "features/plans/hooks/query/useGetPlans";
import { toastifyClient } from "services/toastifyClient";
import { PlanCard } from "features/plans";
import { Button, Typography } from "components/shared/UI";
import { ButtonVariant } from "components/shared/UI/buttons";
import SelectPaymentModal from "../components/SelectPaymentModal";
import { ROUTES } from "configs/routes";
import { Link } from "react-router-dom";

const Plans = () => {
  const { data, isError, error } = useGetPlans();
  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  const [showSelectPaymentModal, setShowSelectPaymentMethod] = useState<any>(false);


  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Typography variant="h2" as="h2" className="text-black capitalize">
            all plans
          </Typography>
          <Link to={ROUTES.CHECK_REMAINING}>
            <Button variant={ButtonVariant.PRIMARY}>check your remaining</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 space-y-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4">
          {data &&
            data.plans.map((plan) => (
              <PlanCard plan={plan} onBuyClick={() => setShowSelectPaymentMethod(plan)} />
            ))}
        </div>
      </div>

      {/* {showSelectPaymentModal && (
        <SelectPaymentModal
          plan={showSelectPaymentModal}
          onClose={() => setShowSelectPaymentMethod(false)}
        />
      )} */}
    </>
  );
};

export default Plans;
