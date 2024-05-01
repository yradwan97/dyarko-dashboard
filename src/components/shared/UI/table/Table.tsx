import { Typography } from "components/shared/UI/index";
import { forwardRef, ReactNode } from "react";

export interface TableProps {
  children: ReactNode;
  title?: ReactNode;
  className?: string;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ title, children, className }, ref) => {
    return (
      <div className="border border-gray-200 rounded-lg bg-white w-full overflow-x-auto">
        {title ? (
          <Typography variant="h4" as="h4" className="p-4 capitalize">
            {title}
          </Typography>
        ) : null}
        <table
          className={`table-auto w-full text-left ${className}`.trimEnd()}
          ref={ref}
        >
          {children}
        </table>
      </div>
    );
  }
);

export default Table;
