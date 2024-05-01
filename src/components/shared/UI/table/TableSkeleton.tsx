import { BodyTr, HeadTr, Table, Td, Th } from "components/shared/UI/table";
import { Skeleton } from "@mui/material";
import Typography from "components/shared/UI/Typography";
import React from "react";

const DEFAULT_ROWS_NUMBER = 10;

interface TableSkeletonProps {
  colsNumber: number;
  rowsNumber?: number;
  hasTitle?: boolean;
}

const TableSkeleton = ({
  hasTitle = false,
  rowsNumber = DEFAULT_ROWS_NUMBER,
  colsNumber,
}: TableSkeletonProps) => {
  const title = hasTitle ? (
    <Skeleton variant="text">
      <Typography variant="h4" as="h4" className="p-4 capitalize">
        Lorem ipsum dolor
      </Typography>
    </Skeleton>
  ) : undefined;

  return (
    <Table title={title}>
      <thead>
        <HeadTr>
          {Array(colsNumber)
            .fill(0)
            .map((_, index) => (
              <Th key={index}>
                <Skeleton variant="text" width="7rem" height="2rem" />
              </Th>
            ))}
        </HeadTr>
      </thead>
      <tbody>
        {Array(rowsNumber)
          .fill(0)
          .map((_, idx) => (
            <BodyTr key={idx}>
              {Array(colsNumber)
                .fill(0)
                .map((_, index) => (
                  <Td key={index}>
                    <Skeleton variant="text" width="10rem" height="1.8rem" />
                  </Td>
                ))}
            </BodyTr>
          ))}
      </tbody>
    </Table>
  );
};

export default TableSkeleton;
