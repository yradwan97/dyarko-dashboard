import { Avatar, Box, Button, Flex, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { Modal, Typography } from "components/shared/UI"
import { t } from "i18next"
import { useEffect, useState } from "react"
import { axiosInstance } from "services/axiosInstance"

const SelectPaymentModal = ({ isOpen, onClose, onPay }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchPaymentMethods = async () => {
    setLoading(true)
    try {
      const { data } = await axiosInstance.get("/payment_methods");
      setPaymentMethods(data.data);
      setLoading(false);
    } catch (e) {
      alert("something went wrong!");
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} className="md:max-w-xl rounded-sm">
        <Typography as="h2" className="text-[20px] capitalize text-start">
          {t("pages.wallet.user-wallet.payment-details")}
        </Typography>
        {loading ? (
          <Box p={4} bg="whiteAlpha.100">
            <Spinner />
          </Box>
        ) : (
          <>
            <SimpleGrid spacing={6} mt={12} columns={{ base: 1, md: 2 }}>
              {paymentMethods.map(paymentMethod => (
                <Flex
                  as="button" onClick={() => {
                    setSelected(paymentMethod)
                  }}
                  bg={selected?.name === paymentMethod?.name ? "main-yellow.600" : "white"}
                  color={selected?.name === paymentMethod?.name ? "white" : "black"}
                  paddingInline={2} paddingBlock={3}
                  borderRadius="10px" gap={2} alignItems="center"
                  border="1px solid #eee"
                >
                  <Avatar src={paymentMethod.logo} size="sm" />
                  {paymentMethod.name}
                </Flex>
              ))}
            </SimpleGrid>
            {selected && (
              <Button
                type="button" bg="main.600" color="white"
                textTransform="capitalize" mt={8}
                _hover={{ bg: "main.500" }}
                isLoading={loading}
                onClick={() => {
                  onPay(selected.key)
                }}
              >
                {t("pages.wallet.user-wallet.payment-button")}
              </Button>
            )}
          </>
        )}
      </Modal>
    </div>
  )
}

export default SelectPaymentModal