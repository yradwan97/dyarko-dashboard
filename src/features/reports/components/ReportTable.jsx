import React from "react";
import { Table } from "components/shared/UI";

const heads = ["invoice", "due date", "tenant", "amount"];

function ReportTable({ tableRef, transactions }) {
  return (
    <Table title={t("pages.reports.table.title")} ref={tableRef}>
      <thead>
        <tr className="flex justify-between border-t border-b border-gray-200 p-4">
          {heads.map((head) => (
            <th
              key={head}
              className="flex-1 text-md font-medium text-gray-500 text-start capitalize"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((row, index) => (
          <tr
            key={index}
            className="flex justify-between py-4 px-4 border-b border-main-100 hover:bg-main-100"
          >
            <td className="flex-1 text-sm font-bold text-black/70 text-start">
              {t(row.invoice)}
            </td>
            <td className="flex-1 text-sm font-medium text-gray-600 text-start">
              {row.dueDate.toDateString()}
            </td>
            <td className="flex-1 text-sm font-medium text-black text-start">
              {row.tenant}
            </td>
            <td className="flex-1 text-sm font-bold text-main-600 text-start">
              {row.amount > 0 ? "+" : null}${row.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ReportTable;
