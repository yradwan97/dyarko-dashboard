import React from "react";
import { Link } from "react-router-dom";
import Badge from "components/shared/SingleProperty/Badge";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { Typography } from "components/shared/UI";

function CustomProperty() {
  return (
    <div>
      <Link to="/property-details">
        <div className="relative bg-[url('/src/assets/images/property.png')] bg-cover bg-center h-[150px]"></div>
      </Link>
      <div className="bg-white p-4 border border-main-100">
        <div className="flex justify-between items-center">
          <div className="flex items-end">
            <Typography
              variant="body-sm-bold"
              as="p"
              className="tracking-tightest text-main-yellow-600"
            >
              $2,095
            </Typography>
            <Typography variant="body-xs" as="span" className="text-gray-400">
              /month
            </Typography>
          </div>
          <Badge badge="Promote" />
        </div>
        <Typography variant="body-md-bold" as="h4" className="mt-1 text-black">
          House with pool
        </Typography>
        <Typography variant="body-xs-md" as="p" className="text-gray-500">
          13086 Safat, Kuwait City
        </Typography>
        <div className="border-t border-main-100 flex gap-x-4 items-center mt-3 pt-3">
          <div className="flex justify-between items-center gap-x-2">
            <AiOutlineHeart className="text-main-600 text-lg" />
            <Typography variant="body-xs-md" as="p" className="text-black">
              3 Likes
            </Typography>
          </div>
          <div className="flex justify-between items-center gap-x-2">
            <AiOutlineEye className="text-main-600 text-lg" />
            <Typography variant="body-xs-md" as="p" className="text-black">
              200 Views
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomProperty;
