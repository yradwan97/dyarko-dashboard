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
import { RiIndeterminateCircleFill } from "react-icons/ri";
import { MdMoneyOffCsred } from "react-icons/md";

const Table = ({
  data,
  handleEndContract,
  handleDisclaimer
}) => {
  return (
    <div className="bg-white rounded-lg px-2 mt-6">
      <table className="table-auto w-full text-start">
        <thead>
          <tr className="flex justify-between p-4">
            <th className="flex-1 text-md font-medium text-gray-500 text-start">
              {t("general.date")}
            </th>
            <th className="flex-1 text-md font-medium text-gray-500 text-start">
              {t("auth.signup.types.owner")}
            </th>
            {/* <th className="flex-1 text-md font-medium text-gray-500 text-start">
            {t("general.property-id")}
            </th> */}
            <th className="flex-1 text-md font-medium text-gray-500 text-start">
            {t("general.contracts")}
            </th>
            <th className="flex-1 text-md font-medium text-gray-500 text-start">
            {t("general.action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(el => (
            <tr key={el._id} className="flex justify-between py-4 px-4 border-b border-main-100 hover:bg-main-100">
              <td className="flex-1 text-sm font-bold text-black/70 text-start">
                {new Date(el.start_date).toLocaleDateString()}
              </td>
              <td className="flex-1 text-sm font-medium text-gray-600 text-start">
                {el.owner?.name || '-'}
              </td>
              {/* <td className="flex-1 text-sm font-medium text-gray-600 text-start">
                {el.property?.code || '-'}
              </td> */}
              <td className="flex-1 flex items-center gap-x-2 text-main-orange-600 text-start">
                <Link display="flex" alignItems="center" gap={2} href={el.contract}>
                  <PDFIcon />
                  <Typography variant="body-sm-medium" as="span">
                  {t("general.contracts")}
                  </Typography>
                </Link>
              </td>
              <td className="flex-1 text-sm font-bold text-black text-start">
                <Menu>
                  <MenuButton color="black" _hover={{ color: "main.600" }}>
                    <FiIcons.FiMoreHorizontal />
                  </MenuButton>
                  <MenuList p={2} minW="auto" borderRadius={2} border="none">
                    <MenuItem
                      color="gray.500" fontWeight="normal" bg="transparent"
                      textTransform={"capitalize"}
                      _hover={{ bg: "main.100", color: "main.600" }}
                      style={{gap: 5}}
                      onClick={() => handleEndContract(el)}
                    >
                      <RiIndeterminateCircleFill size={15} />
                      {t("general.end-contract")}
                    </MenuItem>
                    <MenuItem
                      color="gray.500" fontWeight="normal" bg="transparent"
                      textTransform={"capitalize"}
                      _hover={{ bg: "main.100", color: "main.600" }}
                      style={{gap: 5}}
                      onClick={() => handleDisclaimer(el)}
                    >
                      <MdMoneyOffCsred size={15} />
                      {t("general.request-disclaimer")}
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
