import { Button, Typography } from "components/shared/UI";
import { ButtonVariant } from "components/shared/UI/buttons";
import { Link } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { useAppSelector } from "hooks";
import { selectUser } from "store/auth";
import { User } from "features/users";

const CheckRemaining = () => {
  const auth: any = useAppSelector(state => state.auth);
  const userPlan = auth.user?.plan;
  return (
    <div className="space-y-8 bg-white py-8 px-6 rounded-lg flex flex-col">
      <div className="space-y-8">
        <Typography variant="h4" as="h4" className="text-black mb-8">
          Your remaining
        </Typography>
        <Typography variant="body-md-medium" as="p" className="text-gray-700">
          Properties Number: {userPlan?.number_of_properties || "-"}
        </Typography>
        <Typography variant="body-md-medium" as="p" className="text-gray-700">
          Videos Number: {userPlan?.videos || "-"}
        </Typography>
        <Typography variant="body-md-medium" as="p" className="text-gray-700">
          Search Feature Properties (24h): {userPlan?.search_feature_properties_24 || "-"}
        </Typography>
        <Typography variant="body-md-medium" as="p" className="text-gray-700">
          Search Feature Properties (48h): {userPlan?.search_feature_properties_48 || "-"}
        </Typography>
        <Typography variant="body-md-medium" as="p" className="text-gray-700">
          Home Feature Properties (24h): {userPlan?.home_feature_properties_24 || "-"}
        </Typography>
        <Typography variant="body-md-medium" as="p" className="text-gray-700">
          Home Feature Properties (48h): {userPlan?.home_feature_properties_48 || "-"}
        </Typography>
      </div>
      <div className="flex justify-center">
        <Link to={ROUTES.PLANS}>
          <Button variant={ButtonVariant.PRIMARY}>view all plans</Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckRemaining;
