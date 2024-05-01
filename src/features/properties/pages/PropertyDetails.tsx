import * as FiIcons from "react-icons/fi";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Link as ChakraLink,
  Input,
} from "@chakra-ui/react";
import {
  getPropertyPrice,
  PropertyDetailsSection,
  SearchAside,
  format,
  useGetProperty,
  Property,
  Tent,
} from "features/properties";
import { useParams } from "react-router-dom";
import { toastifyClient } from "services/toastifyClient";
import { Button } from "components/shared/UI";
import TentInformation from "../components/TentInformation";
import { images } from "../utils/images";
import { ButtonVariant } from "components/shared/UI/buttons";
import { useState } from "react";
import { axiosInstance } from "services/axiosInstance";
import { t } from "i18next";

const PropertyDetails = () => {
  const propertyId = useParams().id;
  const [offerAmount, setOfferAmount] = useState<string>("");
  const [validUntil, setValidUntil] = useState<string>("");
  if (propertyId === undefined) return null;
  const { data, isError, error, isLoading, refetch } =
    useGetProperty(propertyId);

  if (isError) toastifyClient.error({ message: error?.message ?? "" });

  const property: Property | undefined = data?.property || undefined;
  const isRent = property?.payment_type === "rent";
  const isInstallment = property?.payment_type === "installment";
  const isTentGroup = property?.category === "tent_group";
  const getStars = (rate = 0) => {
    const els = [];
    for (let i = 1; i <= 5; i++) {
      els.push(
        <Box marginInline="1px" color={rate >= i ? "orange" : "gray.500"}>
          <FiIcons.FiStar />
        </Box>
      );
    }
    return els.map((el) => el);
  };
  const handleCreateOffer = async () => {
    const offerBody = {
      discount: offerAmount,
      discount_expiration_date: new Date(validUntil!)
        .setHours(0, 0, 0, 0)
        .toString(),
    };
    try {
      let res = await axiosInstance.post(
        `/properties/${propertyId}/offer`,
        offerBody
      );
      toastifyClient.success({message: "Offer created successfully."})
      if (res.data.success) {
        setOfferAmount("");
        setValidUntil("");
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return isLoading ? (
    <h1>{t("general.loading")} ...</h1>
  ) : (
    <Stack spacing={4}>
      {/* header block */}
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Stack spacing={2}>
          <Heading
            as="h2"
            fontSize="2rem"
            color="black"
            textTransform="capitalize"
            fontWeight="600"
          >
            {property?.title}
          </Heading>
          <Text color="gray.600" fontSize="1rem">
            {property?.locations[0]}
          </Text>
        </Stack>
        {getPropertyPrice(property!) && (
          <Stack direction={"column"}>
            {property!.discount && (
              <Flex justifyContent="flex-end" alignItems="center">
                <Text
                  fontSize="1.2rem"
                  className={`text-main-600`}
                  fontWeight="bold"
                >
                  {format(getPropertyPrice(property!, true)!)}
                </Text>
              </Flex>
            )}
            <Flex justifyContent="flex-end">
              <Text
                fontSize="1.5rem"
                className={`text-main-yellow-600 ${
                  property!.discount && "line-through"
                }`}
                fontWeight="bold"
              >
                {format(getPropertyPrice(property!)!)}
              </Text>
            </Flex>
          </Stack>
        )}
      </SimpleGrid>

      {/* images block */}
      <Flex flexWrap="wrap">
        <Box
          height={{ base: "300px", md: "408px" }}
          borderRadius={4}
          pe={{ base: 0, md: 6 }}
          width={{ base: "100%", md: "70%" }}
          mb={{ base: 4, md: 0 }}
        >
          <Image
            src={property?.image ? property?.image : images[1]}
            height="100%"
            width="110%"
            borderRadius={4}
            objectFit="cover"
          />
        </Box>
        {property?.images && property.images.length > 1 && (
          <Box width={{ base: "100%", md: "30%" }}>
            <Slider
              dots={false}
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToScroll={1}
              slidesToShow={2}
              autoplaySpeed={3000}
              vertical
            >
              {property?.images.map((img, index) => (
                <Box
                  p={1}
                  height="200px"
                  borderRadius={4}
                  key={index}
                  width="100%"
                  border="1px solid"
                  borderColor="main.600"
                >
                  <Image
                    src={img!}
                    height="100%"
                    width="100%"
                    borderRadius={4}
                    objectFit="cover"
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        )}
      </Flex>

      {/* info block */}
      <Flex flexWrap="wrap">
        <Box width={{ base: "100%", md: "70%" }} pe={{ base: 0, md: 6 }}>
          <Heading
            as="h2"
            fontSize="1.2rem"
            color="black"
            textTransform="capitalize"
            fontWeight="bold"
            mt={6}
            mb={4}
          >
            {t("pages.properties.about")}
          </Heading>
          {property!.description && (
            <Text color="black" fontSize=".9rem" fontWeight="normal">
              {property!.description}
            </Text>
          )}

          {/* divider */}
          <Box borderTop={`1px solid #E5E6EB`} marginBlock={10} />

          <Heading
            as="h2"
            fontSize="1.2rem"
            color="black"
            textTransform="capitalize"
            fontWeight="bold"
            mb={8}
          >
            {t("pages.properties.info")}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={12} spacingY={3}>
            <Flex justifyContent="space-between">
              <Text
                textTransform="capitalize"
                opacity="50%"
                fontSize=".9rem"
                fontWeight="400"
              >
                {t("pages.properties.listed-on-dyarko")}
              </Text>
              <Text color="black" fontSize="1rem" fontWeight="500">
                {new Date(property?.createdAt!).toLocaleDateString()}
              </Text>
            </Flex>
            {property?.available_date && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.available-date")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.available_date
                    ? new Date(property.available_date).toLocaleDateString()
                    : "N/A"}
                </Text>
              </Flex>
            )}
            <Flex justifyContent="space-between">
              <Text
                textTransform="capitalize"
                opacity="50%"
                fontSize=".9rem"
                fontWeight="400"
              >
                {t("general.payment-type")}
              </Text>
              <Text
                color="black"
                fontSize="1rem"
                fontWeight="500"
                textTransform={"capitalize"}
              >
                {property?.payment_type}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text
                textTransform="capitalize"
                opacity="50%"
                fontSize=".9rem"
                fontWeight="400"
              >
                {t("general.category")}
              </Text>
              <Text
                color="black"
                fontSize="1rem"
                fontWeight="500"
                textTransform={"capitalize"}
              >
                {property?.category.replace("_", " ")}
              </Text>
            </Flex>
            {property?.type && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.type")}
                </Text>
                <Text
                  color="black"
                  fontSize="1rem"
                  fontWeight="500"
                  textTransform={"capitalize"}
                >
                  {property?.type.replace("_", " ")}
                </Text>
              </Flex>
            )}
            {!isNaN(property?.area!) && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.area")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.area}
                </Text>
              </Flex>
            )}
            {!isNaN(property?.bathrooms!) && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.bathrooms")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.bathrooms}
                </Text>
              </Flex>
            )}
            {!isNaN(property?.bedrooms!) && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.bedrooms")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.bedrooms}
                </Text>
              </Flex>
            )}
            {property?.daily_price && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.daily-price")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.daily_price}
                </Text>
              </Flex>
            )}
            {property?.weekly_price && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.weekly-price")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.weekly_price}
                </Text>
              </Flex>
            )}
            {property?.monthly_price && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.monthly-price")}
                </Text>
                <Text color="black" fontSize="1rem" fontWeight="500">
                  {property?.monthly_price}
                </Text>
              </Flex>
            )}
            {property?.is_finished && (
              <Flex justifyContent="space-between">
                <Text
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {t("general.is-finished")}
                </Text>
                <Text
                  color="black"
                  fontSize="1rem"
                  fontWeight="500"
                  textTransform={"capitalize"}
                >
                  {property?.finish_type}
                </Text>
              </Flex>
            )}
          </SimpleGrid>

          {/* divider */}
          <Box borderTop={`1px solid #E5E6EB`} marginBlock={10} />

          <Heading
            as="h2"
            fontSize="1.2rem"
            color="black"
            textTransform="capitalize"
            fontWeight="bold"
            mb={8}
          >
            {t("general.amenities")}
          </Heading>
          {property!.amenities.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={12} spacingY={3}>
              {property?.amenities.map((am: any) => (
                <Text
                  key={am._id}
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {am.name}
                </Text>
              ))}
            </SimpleGrid>
          ) : (
            <Text
              bg="white"
              p={4}
              textAlign="center"
              textTransform="capitalize"
            >
              {t("general.no-data")}
            </Text>
          )}

          {/* divider */}
          <Box borderTop={`1px solid #E5E6EB`} marginBlock={10} />

          <Heading
            as="h2"
            fontSize="1.2rem"
            color="black"
            textTransform="capitalize"
            fontWeight="bold"
            mb={8}
          >
            {t("general.services")}
          </Heading>
          {property!.services.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={12} spacingY={3}>
              {property?.services.map((service: any) => (
                <Text
                  key={service._id}
                  textTransform="capitalize"
                  opacity="50%"
                  fontSize=".9rem"
                  fontWeight="400"
                >
                  {service.name}
                </Text>
              ))}
            </SimpleGrid>
          ) : (
            <Text
              bg="white"
              p={4}
              textAlign="center"
              textTransform="capitalize"
            >
              {t("general.no-data")}
            </Text>
          )}

          {/* divider */}
          <Box borderTop={`1px solid #E5E6EB`} marginBlock={10} />

          <Heading
            as="h2"
            fontSize="1.2rem"
            color="black"
            textTransform="capitalize"
            fontWeight="bold"
            mb={8}
          >
            {t("general.interior-design")}
          </Heading>
          {property?.interior_design ? (
            <img src={property?.interior_design} />
          ) : (
            <Text
              bg="white"
              p={4}
              textAlign="center"
              textTransform="capitalize"
            >
              {t("general.no-data")}
            </Text>
          )}

          <Box borderTop={`1px solid #E5E6EB`} marginBlock={10} />

          {isTentGroup ? (
            <>
              <Heading
                as="h2"
                fontSize="1.2rem"
                color="black"
                textTransform="capitalize"
                fontWeight="bold"
                mb={8}
              >
                {t("general.tents-info")}
              </Heading>
              <TentInformation tents={property?.tents_info} />
            </>
          ) : null}
        </Box>
        <Box width={{ base: "100%", md: "30%" }}>
          {/* developer section */}
          <Stack
            spacing={4}
            direction={"column"}
            borderRadius={4}
            border="1px solid"
            borderColor="main.600"
            bg="#C9ECFA"
            mt={6}
            p={4}
            textTransform="capitalize"
            color="black"
            fontSize=".9rem"
          >
            <Flex>
              <Box ms={4}>
                <Heading fontWeight="normal" fontSize="1rem">
                  {t("pages.properties.new-offer")}
                </Heading>
              </Box>
            </Flex>
            <Flex>
              <Box ms={0} bg={"white"} borderRadius={10} p={2} width={"full"}>
                <Heading mb={2} fontWeight="normal" fontSize="1rem">
                  {t("pages.properties.offer")} (%)
                </Heading>
                <Stack direction={"column"} spacing={2}>
                  <Input
                    type="number"
                    height="45px"
                    borderColor="cyan"
                    borderWidth={1}
                    borderStyle="solid"
                    placeholder={t("pages.properties.offer-amount")!}
                    textTransform="capitalize"
                    value={offerAmount!}
                    onChange={(e) => setOfferAmount(e.target.value)}
                  />
                  <Heading mb={2} fontWeight="normal" fontSize="1rem">
                    {t("pages.properties.offer-validity")}
                  </Heading>
                  <Input
                    type="date"
                    height="45px"
                    borderColor="cyan"
                    borderWidth={1}
                    borderStyle="solid"
                    value={validUntil!}
                    onChange={(e) => {
                      setValidUntil(e.target.value);
                    }}
                  />
                  <Button
                    disabled={!offerAmount || !validUntil}
                    variant={ButtonVariant.PRIMARY}
                    onClick={handleCreateOffer}
                  >
                    {t("pages.properties.make-offer")}
                  </Button>
                </Stack>
              </Box>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
};

export default PropertyDetails;
