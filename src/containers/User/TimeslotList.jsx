import React, { useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { TimeSlot } from "./TimeSlot";

export function TimeslotList({ timeslots, onBook, isUser }) {
  const [timeSlot, setTimeSlot] = useState({});
  const canShowBookButton = isUser && timeslots.length > 0;

  return (
    <Grid container spacing={1} className="timeslot-list">
      <Grid item md={6} xs={12} style={{ height: "200px", overflow: "auto" }}>
        <Grid container spacing={2}>
          {timeslots.map((timeslot) => (
            <TimeSlot
              key={timeslot.startTime}
              timeslot={timeslot}
              onClick={() => setTimeSlot(timeslot)}
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
