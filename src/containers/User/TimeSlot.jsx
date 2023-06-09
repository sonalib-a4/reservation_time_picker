import React from "react";
import { Grid, Paper, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import "react-calendar/dist/Calendar.css";
import { isAdmin, getCurrentUser } from '../../services/useAuth';

export function TimeSlot({ timeslot, onBook }) {
  const { startTime, endTime, capacity, booked, usernames, bookedCount } = timeslot;
  const currentUser = getCurrentUser() 
  const Item = styled(Button)(({ theme }) => ({
    backgroundColor: booked ? "#d54f4f" : "#8cdd8c",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    cursor: booked ? "auto" : "pointer",
    '&:hover': {
      backgroundColor: booked ? "#d54f4f" : "#8cdd8c",
    },
    "&:disabled": {
      backgroundColor: (timeslot.usernames.includes(currentUser) ? 'orange' : '#d54f4f'),
      color: "white"
    }
  }));

  return (
    <Grid
      item
      xs={5}
      className={`timeslot ${booked ? "booked" : ""}`}
    >
        <Tooltip title={isAdmin() ? timeslot.usernames.join(' | ') : ''}>
          <Item disabled={booked} onClick={onBook} variant="contained" >
            <h4>{startTime} - {endTime}</h4>
            <h4>Capacity - {capacity} Max</h4>
          </Item>
        </Tooltip>
    </Grid>
  );
}

export default TimeSlot;
