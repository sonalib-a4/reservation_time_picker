import { Box, Drawer, IconButton, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

const Sidebar = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div>
      <IconButton
        sx={{ color: "black" }}
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
          <Box
            sx={{ display: "flex", flexDirection: "row", marginTop: "4%" }}
          ></Box>
        </Box>
        <Typography
          sx={{ marginLeft: "10%", marginTop: "110%", fontSize: "22px" }}
        >
          Logout
        </Typography>
      </Drawer>
    </div>
  );
};

export default Sidebar;
