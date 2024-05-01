import Pagination, {
  PaginationRenderItemParams,
} from "@mui/material/Pagination";
import React, { ChangeEvent, ReactNode } from "react";
import { PaginationItem, PaginationItemProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface PaginatorProps {
  lastPage: number;
  page?: number;
  onChange: (newPage: number) => void;
}

const Paginator = ({ page = 1, lastPage, onChange }: PaginatorProps) => {
  const {i18n} = useTranslation()
  const isRtl = i18n.language === "ar"
  const handleChange = (event: ChangeEvent<unknown>, newPage: number) => {
    onChange(newPage);
  };
  const renderItem = (params: PaginationRenderItemParams): ReactNode => {
    const newParams: PaginationItemProps = { ...params };

    if (params.type === "page") newParams.disabled = params.selected;
    return <PaginationItem slots={{previous: isRtl ? ArrowForwardIcon : ArrowBackIcon , next: isRtl ? ArrowBackIcon : ArrowForwardIcon}} {...newParams} />;
  };

  return (
    <div className="mt-12 flex justify-center gap-x-3">
      <Pagination
        size="large"
        siblingCount={2}
        count={lastPage}
        page={page}
        onChange={handleChange}
        renderItem={renderItem}
      />
    </div>
  );
};

export default Paginator;
