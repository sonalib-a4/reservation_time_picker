import React from "react";
import { Grid, Paper, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import "react-calendar/dist/Calendar.css";

export function TimeSlot({ timeslot, onBook }) {
  const { startTime, endTime, capacity, booked, usernames } = timeslot;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: booked ? "#e91e63" : "#8cdd8c",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    cursor: booked ? "auto" : "pointer",
  }));

  return (
    <Grid
      item
      xs={5}
      className={`timeslot ${booked ? "booked" : ""}`}
    >
        <Tooltip title={usernames[0]}><Button disabled={timeslot.disabled} onClick={onBook} variant="contained" sx={{ backgroundColor: booked ? "#e91e63" : "#8cdd8c",
                textAlign: "center",
                color: "white",
                cursor: booked ? "auto" : "pointer",
                width: "150px"}}>
          <span>{startTime}</span> - <span>{endTime} </span>
        </Button>
        </Tooltip>
    </Grid>
  );
}

export default TimeSlot;
