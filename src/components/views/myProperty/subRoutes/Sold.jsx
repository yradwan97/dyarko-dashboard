import React from "react";
import { Link } from "react-router-dom"; // import ViewBadge from '../../../shared/SingleProperty/ViewBadge'
import { Typography } from "components/shared/UI";

function Sold() {
  return (
    <div className="rounded-lg overflow-hidden">
      <Link to="/property-details">
        <div className="relative bg-[url('/src/assets/images/property.png')] bg-cover bg-center h-[150px]"></div>
      </Link>
      <div className="bg-white p-4 border border-main-100">
        <div className="flex justify-between items-center">
          <div className="flex items-end">
            <Typography
              variant="body-xl-bold"
              as="p"
              className="tracking-tightest text-main-yellow-600"
            >
              $2,095
            </Typography>
            <Typography variant="body-sm" as="span" className="text-gray-400">
              /month
            </Typography>
          </div>
          {/* <ViewBadge badge="Promote" /> */}
        </div>
        <Typography variant="body-md-bold" as="h4" className="my-1 text-black">
          House with pool
        </Typography>
        <Typography variant="body-sm-medium" as="p" className="text-gray-400">
          13086 Safat, Kuwait City
        </Typography>
        <div className="border-t border-main-200 flex gap-x-4 items-center mt-3 pt-3">
          <Link to="/contract">
            <Typography
              variant="body-md-medium"
              as="span"
              className="text-main-600 underline"
            >
              View Contract
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sold;
