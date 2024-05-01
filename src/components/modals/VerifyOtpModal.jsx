// import QRCode from "react-qr-code";
import { Avatar, AvatarBadge, Box, Flex, Stack, Text } from "@chakra-ui/react"
import * as FiIcons from "react-icons/fi";
import { useAppSelector } from "hooks";
import { Modal } from "components/shared/UI"
import { t } from "i18next";

const VerifyOtpModal = ({
  onClose
}) => {
  const auth = useAppSelector(state => state.auth);

  return (
    <Modal
      isOpen={true}
      allowCloseBtn={false}
      onClose={onClose}
      className="md:max-w-xs rounded-md"
    >
      <Flex borderBottom="1px solid" borderColor="gray.200" justifyContent="space-between" pb={4}>
        <Text
          as="h5" textAlign="start"
          textTransform="capitalize" fontWeight="500"
        >
          {t("auth.otp.get-verified")}
        </Text>
        <button onClick={onClose}>
          <FiIcons.FiX size={18} />
        </button>
      </Flex>
      <Stack spacing={4} paddingBlock={6}>
        <Text fontSize="1.1rem" color="black">
          {t("auth.otp.want-verified")}
        </Text>
        <Avatar
          margin="auto" bg="main.600" color="white"
          name={auth.user?.name} size="md"
        >
          <AvatarBadge boxSize="1.2rem" bg="green" />
        </Avatar>
        <Text fontWeight="normal" fontSize=".9rem">
          {t("auth.otp.download")}
          <Box as="p" color="main.600" paddingInline={1} display="inline-block">{t("auth.otp.app")}</Box>
          {t("auth.otp.get-verified-now")}
        </Text>
        {/* <div style={{ background: 'white', padding: '16px' }}>
          <QRCode
            size={60}
            style={{ height: "150px", maxWidth: "100%", width: "100%" }}
            value={23}
            viewBox={`0 0 100 100`}
          />
        </div> */}
        <Text fontWeight="normal" fontSize=".9rem">
          {t("auth.otp.follow-steps")}
          <Box as="p" color="main.600">{t("auth.otp.otp-number")}</Box>
        </Text>
      </Stack>
    </Modal>
  )
}

export default VerifyOtpModal