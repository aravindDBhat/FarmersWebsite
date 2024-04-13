import { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import LandingPage from "../LandingPage/LandingPage";
import { ThemeContext } from "@mui/styled-engine";
import Header from "./Headder/headder";
import Issue from "./Issues/issue";
import { useNavigate } from "react-router-dom";

function Post() {
  const [tab, setTab] = useState("1");
  const [area, setArea] = useState(null);
  const [areaName, setAreaName] = useState(null);
  const [areaWallet, setareaWallet] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const d = new Date();
    let validate = localStorage.getItem("Token");
    validate = JSON.parse(validate);
    if (validate.id && validate.date === d.getDate()) {
      navigate("/post");
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="post">
      <Navbar />
      <div>
        <Box>
          <TabContext value={tab}>
            <TabList
              onChange={(e, value) => setTab(value)}
              aria-label="lab API tabs example"
            >
              <Tab label="Issues" value="1" />
              <Tab label="Approve" value="2" />
              <Tab label="Works" value="3" />
            </TabList>
            <TabPanel value="1">
              <Issue />
            </TabPanel>
            <TabPanel value="2"></TabPanel>
            <TabPanel value="3"></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
export default Post;
