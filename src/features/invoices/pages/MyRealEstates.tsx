// import PrintDropdown from "../components/PrintDropdown";
import {
  PROPERTIES_FILTER,
  PropertiesSection,
  PropertiesSkeleton,
  useGetProperties,
  usePropertiesFilterReducer,
  PaymentType,
} from "features/properties";
import clsx from "classnames";
import { toastifyClient } from "services/toastifyClient";
import InvoicePropertyCard from "../components/InvoicePropertyCard";
import EmptyInvoicePropertiesSection from "../components/EmptyInvoicePropertiesSection";
import { t } from "i18next";

function MyRealEstate() {
  const [filter, dispatchFilter] = usePropertiesFilterReducer();
  const { data, isLoading, isError, error } = useGetProperties(filter);
  const properties = data?.properties;

  const handlePageChange = (page: number) =>
    dispatchFilter({ filter: PROPERTIES_FILTER.PAGE, value: page });

  const handlePaymentTypeFilterClick = (tab: string) => {
    dispatchFilter({ filter: PROPERTIES_FILTER.PAYMENT_TYPE, value: tab });
  };

  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  return (
    <>
      <div className="flex gap-6">
        {Object.values(PaymentType).filter(type => type === "rent" || type === "installment").map((tab) => {
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
            properties={properties}
            pagesCount={data?.pages || 0}
            onPageChange={handlePageChange}
            page={Number(filter.page!)}
            propertyCardRenderer={(property) => (
              <InvoicePropertyCard property={property} />
            )}
            emptyPage={<EmptyInvoicePropertiesSection />}
          />
        )}
      </div>
    </>
  );
}

export default MyRealEstate;
