import { BiChevronDown, BiLogOut } from 'react-icons/bi'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Avatar,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

import { logout } from "features/auth/services/authSlice";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "configs/routes"
import { useAppDispatch, useAppSelector } from "hooks"
import { t } from 'i18next';

function LoginDropdown() {
  const auth = useAppSelector(state => state.auth);
  const [isMediumScreen, isLargeScreen] = useMediaQuery(["(min-width: 30em) and (max-width: 48em)", "(min-width: 48em)"])
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        as={Button} rightIcon={<BiChevronDown />}
        border="1.5px solid" borderColor="main.400" bg="white" width={"auto"}
        paddingBlock={6} paddingInline={3} borderRadius="8px" textTransform="capitalize"
      >
        <Flex alignItems="center" gap={2}>
          <Avatar name={auth.user?.name} size="sm" />
          {isLargeScreen ? auth.user?.name : isMediumScreen ? auth.user?.name?.slice(0, 3) : null}
        </Flex>
      </MenuButton>
      <MenuList p={2} minW="auto">
        <MenuItem onClick={() => {
          dispatch(logout())
          navigate(ROUTES.LOGIN);
        }}>
          <Flex alignItems="center" gap={2}>
            <BiLogOut />
            <Text textTransform="capitalize">
            {t("layout.navbar.logout")}
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default LoginDropdown
