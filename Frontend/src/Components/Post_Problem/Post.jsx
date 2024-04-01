import { useState } from "react";
import Navbar from "../Navbar/navbar";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import LandingPage from "../LandingPage/LandingPage";
import { ThemeContext } from "@mui/styled-engine";
import Header from "./Headder/headder";

function Post() {
  const [tab, setTab] = useState("1");
  const [area, setArea] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [areaWallet, setareaWallet] = useState(0);

  return (
    <div>
      <Navbar />
      <div>
        <Box>
          <TabContext value={tab}>
            <TabList
              onChange={(e, value) => setTab(value)}
              aria-label="lab API tabs example"
            >
              <Tab label="Issues" value="1" />
              <Tab label="Volunteers" value="2" />
              <Tab label="Works" value="3" />
            </TabList>
            <TabPanel value="1">
              <LandingPage />
            </TabPanel>
            <TabPanel value="2">
              <LandingPage />
            </TabPanel>
            <TabPanel value="3">
              <LandingPage />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
export default Post;
