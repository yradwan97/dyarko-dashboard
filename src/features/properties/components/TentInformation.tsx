import React, { BaseSyntheticEvent } from "react";
import { Typography } from "components/shared/UI";
import { Tent } from "../types";
import { Box, Tab, Tabs, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import SingleTent from "./SingleTent";

const TentInformation = ({ tents }: { tents: Tent[] | undefined }) => {
  const [value, setValue] = React.useState("0");

  const handleChange = (event: BaseSyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="pb-8 border-b border-gray-200">
      <div className="flex gap-x-20">
        <div className="flex-1">
          <Box sx={{ width: "100%", typography: "body1" }}>
              <Tabs>
                <TabList>
                    {tents?.map((tent: Tent, index: number) => (
                        <Tab key={index}>{`Tent #${tent.code}`}</Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {tents?.map((tent: Tent, index: number) => (
                        <TabPanel key={index}>
                            <SingleTent tent={tent} />
                        </TabPanel>
                    ))}
                </TabPanels>
              </Tabs>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default TentInformation;
