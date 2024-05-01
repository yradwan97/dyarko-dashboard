import * as FiIcons from "react-icons/fi";
import {
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import PDFIcon from "components/shared/icons/PDFIcon";
import { Typography } from "components/shared/UI";
import { t } from "i18next";


const Table = ({
  data,
  handleEndContract,
}) => {
  return (
    <div className="bg-white rounded-lg px-2 mt-6">
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="flex justify-between p-4">
            <th className="flex-1 text-md font-medium text-gray-500 text-left">
              {t("general.date")}
            </th>
            <th className="flex-1 text-md font-medium text-gray-500 text-left">
              {t("auth.signup.types.owner")}
            </th>
            <th className="flex-1 text-md font-medium text-gray-500 text-left">
              {t("general.property-id")}
            </th>
            <th className="flex-1 text-md font-medium text-gray-500 text-left">
              {t("general.contracts")}
            </th>
            <th className="flex-1 text-md font-medium text-gray-500 text-left">
              {t("general.action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(el => (
            <tr key={el._id} className="flex justify-between py-4 px-4 border-b border-main-100 hover:bg-main-100">
              <td className="flex-1 text-sm font-bold text-black/70 text-left">
                {new Date(el.start_date).toLocaleDateString()}
              </td>
              <td className="flex-1 text-sm font-medium text-gray-600 text-left">
                {el.owner?.name || '-'}
              </td>
              <td className="flex-1 text-sm font-medium text-gray-600 text-left">
                {el.property?.code || '-'}
              </td>
              <td className="flex-1 flex items-center gap-x-2 text-main-orange-600 text-left">
                <Link display="flex" alignItems="center" gap={2} href={el.contract}>
                  <PDFIcon />
                  <Typography variant="body-sm-medium" as="span">
                  {t("general.contracts")}
                  </Typography>
                </Link>
              </td>
              <td className="flex-1 text-sm font-bold text-black text-left">
                <Menu>
                  <MenuButton color="black" _hover={{ color: "main.600" }}>
                    <FiIcons.FiMoreHorizontal />
                  </MenuButton>
                  <MenuList p={2} minW="auto" borderRadius={2} border="none">
                    <MenuItem
                      color="gray.500" fontWeight="normal" bg="transparent"
                      _hover={{ bg: "main.100", color: "main.600" }}
                      onClick={() => handleEndContract(el)}
                    >
                      {t("general.end-contract")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
