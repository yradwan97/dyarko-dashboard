import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  Image
} from "@chakra-ui/react"
import * as FiIcons from "react-icons/fi";
import kuwaitSvg from "assets/svg/kuwait.svg";
import i18next from "i18next";

const CountryDropdown = ({
  onSelect
}) => {
  const countries = [
    { id: 1, start: "+965", icon: kuwaitSvg },
    { id: 2, start: "+966", icon: kuwaitSvg },
  ];

  const [currentActiveImage, setCurrentActiveImage] = useState(kuwaitSvg);

  return (
    <Menu>
      <MenuButton
        as={Button} bg="none" border="1px solid" borderColor="gray.200"
        borderEnd={i18next.language === "en" && "none"} borderTopEndRadius={i18next.language === "en" && 0} borderBottomEndRadius={i18next.language === "en" && 0}
        borderTopStartRadius={i18next.language === "ar" && 0} borderBottomStartRadius={i18next.language === "ar" && 0}
        color="gray.400" height="50px"
        rightIcon={<FiIcons.FiChevronDown size={16} />}
      >
        <Image
          src={currentActiveImage}
          alt="country"
          width="24px"
          height="24px"
        />
      </MenuButton>
      <MenuList minW="auto" p={2}>
        {countries.map(country => (
          <MenuItem
            key={country.id}
            display="flex"
            gap={2} as={Button}
            onClick={() => {
              setCurrentActiveImage(country.icon)
              onSelect(country.start)
            }}
          >
            <Image
              src={country.icon}
              alt="country"
              width="24px"
              height="24px"
            />
            <Text fontSize="1rem">{country.start}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CountryDropdown