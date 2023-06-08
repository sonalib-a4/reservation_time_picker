import React, { useState } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { TimeSlot } from "./TimeSlot";
import { isAdmin, getCurrentUser } from "../../services/useAuth";

export function TimeslotList({ timeslots, onBook }) {
  const isUser = !isAdmin();
  const canShowBookButton = isUser && timeslots.length > 0;
  const currentUser = getCurrentUser() 

  const getBookedSlot = () => {
    if(currentUser){
      timeslots.find(
        (timeslot) => console.log(timeslot)
      );
    }
  }
  getBookedSlot()
  return (
    <Grid container spacing={1} className="timeslot-list">
      <Grid item md={6} xs={12} style={{ height: "200px", overflow: "auto" }}>
        <Grid container spacing={2}>
          {timeslots.map((timeslot) => (
            <TimeSlot
              key={timeslot.startTime}
              timeslot={timeslot}
              onBook={() => onBook(timeslot)}
            />
          ))}
        </Grid>
      </Grid>
      {canShowBookButton && (
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={onBook}>
            Book Slot
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default TimeslotList;
