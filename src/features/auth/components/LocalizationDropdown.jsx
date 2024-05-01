import { useEffect, useState } from "react";
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
import USSvg from "assets/svg/us.svg";

const LocalizationDropdown = ({
  selectedLang,
  onSelect
}) => {
  const countries = [
    { id: 1, value: "en", name: "English", icon: USSvg },
    { id: 2, value: "ar", name: "العربية", icon: kuwaitSvg },
  ];

  const [currentActiveImage, setCurrentActiveImage] = useState(selectedLang === "en" ? USSvg : kuwaitSvg);
  useEffect(() => {
    setCurrentActiveImage(selectedLang === "en" ? USSvg : kuwaitSvg);
  }, [selectedLang]);

  return (
    <Menu>
      <MenuButton
        as={Button} bg="none" border="1px solid" borderColor="gray.200"
        color="gray.400" height="42px" width={"20%"}
        rightIcon={<FiIcons.FiChevronDown size={13} />}
      >
        <Image
          src={currentActiveImage}
          alt="country"
          width="30px"
          height="30px"
        />
      </MenuButton>
      <MenuList minW="auto" p={1}>
        {countries.map(country => (
          <MenuItem
            key={country.id}
            display="flex"
            gap={2} as={Button}
            onClick={() => {
              setCurrentActiveImage(country.icon)
              onSelect(country.value)
            }}
          >
            <Image
              src={country.icon}
              alt="country"
              width="24px"
              height="24px"
            />
            <Text fontSize="1rem">{country.name}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LocalizationDropdown