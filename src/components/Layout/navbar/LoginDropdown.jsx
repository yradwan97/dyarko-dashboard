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
} from '@chakra-ui/react'

import { logout } from "features/auth/services/authSlice";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "configs/routes"
import { useAppDispatch, useAppSelector } from "hooks"
import { t } from 'i18next';

function LoginDropdown() {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        as={Button} rightIcon={<BiChevronDown />}
        border="1.5px solid" borderColor="main.400" bg="white"
        paddingBlock={6} paddingInline={3} borderRadius="8px" textTransform="capitalize"
      >
        <Flex alignItems="center" gap={2}>
          <Avatar name={auth.user?.name} size="sm" />
          {auth.user?.name?.slice(0, 3)}
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
