import { Property } from "features/properties/types";
import { Optional } from "types";
import Paginator from "components/shared/pagination/Paginator";
import {useState} from "react";
import PromotionModal from "../../promotion/components/promotionModal";
import EmptyPropertiesSection from "./EmptyPropertiesSection";
import {
  promotionModalActions,
  selectModalState
} from "../../promotion/slices/PromotionModalSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";

export interface PropertiesSectionProps {
  properties: Optional<Property[]>;
  pagesCount: number;
  page?: number
  onPageChange: (page: number) => void;
  propertyCardRenderer: (property: Property) => JSX.Element;
  emptyPage?: JSX.Element;
}

const PropertiesSection = ({
  properties,
  pagesCount,
  onPageChange,
  page,
  propertyCardRenderer,
  emptyPage = <EmptyPropertiesSection />,
}: PropertiesSectionProps) => {
  const dispatch = useAppDispatch();
  const hideModel = ()=> dispatch(promotionModalActions.hide());
  const isShown = useAppSelector(selectModalState);
  if (properties && properties.length > 0)
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-10 gap-4 md:gap-8">
          {properties.map(propertyCardRenderer)}
        </div>
        <PromotionModal
          showModal={isShown}
          onClose={hideModel}
        />
        <Paginator lastPage={pagesCount} onChange={onPageChange} page={page}/>
      </>
    );
    return emptyPage;

};

export default PropertiesSection;
