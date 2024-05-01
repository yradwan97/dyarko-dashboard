import React, { useState } from "react";
import {
  PaymentType,
  PROPERTIES_FILTER,
  PropertiesSection,
  PropertiesSkeleton,
  usePropertiesFilterReducer,
} from "features/properties";
import useGetProperties from "features/properties/hooks/query/useGetProperties";
import clsx from "classnames";
import { toastifyClient } from "services/toastifyClient";
import PropertyCardWithActions from "../components/PropertyCardWithActions";
import { t } from "i18next";

const Properties = () => {
  const [filter, dispatchFilter] = usePropertiesFilterReducer();
  const { data, isLoading, isError, error } = useGetProperties(filter);
  const properties = data?.properties;
  const [page, setPage] = useState<number>(1)
  const handlePageChange = (page: number) => {
    setPage(page)
    dispatchFilter({ filter: PROPERTIES_FILTER.PAGE, value: page });
  }

  const handlePaymentTypeFilterClick = (tab: string) => {
    dispatchFilter({ filter: PROPERTIES_FILTER.PAYMENT_TYPE, value: tab });
  };

  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  return (
    <>
      <div className="flex gap-6">
        {Object.values(PaymentType).map((tab) => {
          const isActive = filter.payment_type === tab;
          return (
            <button
              key={tab}
              className={clsx(
                "text-sm",
                "py-2",
                "capitalize",
                "outline-0",
                {
                  "font-bold text-main-600 border-b-2 border-main-600":
                    isActive,
                },
                {
                  "text-gray-400 font-medium": !isActive,
                }
              )}
              onClick={handlePaymentTypeFilterClick.bind(null, tab)}
            >
              {t(`payment-types.${tab}`)}
            </button>
          );
        })}
      </div>
      <div className="mt-2">
        {isLoading ? (
          <PropertiesSkeleton />
        ) : (
          <PropertiesSection
            page={page}
            properties={properties}
            pagesCount={data?.pages || 0}
            onPageChange={handlePageChange}
            propertyCardRenderer={(property) => (
              <PropertyCardWithActions key={property._id} property={property} />
            )}
          />
        )}
      </div>
    </>
  );
};

export default Properties;
