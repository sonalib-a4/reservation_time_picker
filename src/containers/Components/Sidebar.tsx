import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Workspace from "../Layouts/workspace";
import TimeSlot from "../Layouts/TimeSlot";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  let navigate = useNavigate();
  let path: string;

  const closeDrawer = () => {
    setSideBarOpen(false);
  };

  const routeChange = (Routevalue: string) => {
    if (Routevalue === "slot") {
      path = "/";
    } else {
      path = "/timeslot";
    }
    navigate(path);
    closeDrawer();
  };

  return (
    <Box sx={{ alignItems: "start" }}>
      <IconButton
        sx={{
          color: "black",
          alignItems: "start",
          justifyContent: "start",
        }}
        size="large"
        edge="start"
        aria-label="Menu"
        onClick={() => setSideBarOpen(true)}
      >
        <BiMenu></BiMenu>
      </IconButton>
      <Drawer
        sx={{ width: "100%" }}
        anchor="left"
        open={isSideBarOpen}
        onClose={() => setSideBarOpen(false)}
      >
        <Box width="330px" padding={2} />
        <Button
          sx={{ marginLeft: "9%", marginRight: "9%" }}
          variant="contained"
          component="button"
          onClick={() => routeChange("slot")}
        >
          Create Slot
        </Button>
        <Button
          sx={{ marginLeft: "9%", marginRight: "9%", marginTop: "5%" }}
          variant="contained"
          component="button"
          onClick={() => routeChange("timeslot")}
        >
          Timeslot List
        </Button>
        <Typography
          sx={{ marginLeft: "10%", marginTop: "130%", fontSize: "22px" }}
        >
          Logout
        </Typography>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
