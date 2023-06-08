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
import { BrowserStorageService } from "../../services/browser_storage_service";
import Avatar from '@mui/material/Avatar';


const Sidebar = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  let navigate = useNavigate();
  let path: string;
  const loggedInUsername = BrowserStorageService.get("username");
  const loggedInUserRole = BrowserStorageService.get("role");
  const isAdmin = loggedInUsername && loggedInUserRole === 'admin';
  const isUser = loggedInUsername && loggedInUserRole === 'user';
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

  const logout = () => {
    BrowserStorageService.put("username", "");
    BrowserStorageService.put("role", "");
    navigate("/");
    closeDrawer();
  }

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
        <div>
        
        </div>
        { isAdmin && 
        <>
          <Avatar>
            A
          </Avatar>
          <Button
            sx={{ marginLeft: "9%", marginRight: "9%" }}
            variant="contained"
            component="button"
            onClick={() => routeChange("slot")}
          >
            Create Slot
          </Button> 
          </>
        }
        {
          isUser && 
          <Button
            sx={{ marginLeft: "9%", marginRight: "9%", marginTop: "5%" }}
            variant="contained"
            component="button"
            onClick={() => routeChange("timeslot")}
          >
            Timeslots List
          </Button>
        }

        <Button
          sx={{ marginLeft: "10%", marginTop: "130%", fontSize: "22px" }}
          variant="contained"
          component="button"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
