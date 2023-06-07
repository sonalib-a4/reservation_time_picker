import { Box, Drawer, IconButton, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import Workspace from "../Layouts/workspace";
import TimeSlot from "../Layouts/TimeSlot";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  let navigate = useNavigate();
  // const routeChange = () => {
  //   let path = `newPath`;
  //   navigate(path);
  // };

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
        <Box width="330px" padding={2}>
          <Box>
            <Link component="button" onClick={() => <Workspace />}>
              Create Meeting
            </Link>
            <Link
              sx={{ marginTop: "2%" }}
              component="button"
              onClick={() => <TimeSlot />}
            >
              Timeslot List
            </Link>
          </Box>
        </Box>
        <Typography
          sx={{ marginLeft: "10%", marginTop: "150%", fontSize: "22px" }}
        >
          Logout
        </Typography>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
