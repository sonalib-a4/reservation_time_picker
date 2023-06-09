import React, { useState } from "react";
import { Grid, Button, Typography} from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { TimeSlot } from "./TimeSlot";
import { isAdmin, getCurrentUser } from "../../services/useAuth";

export function TimeslotList({ timeslots, onBook }) {
  const isUser = !isAdmin();
  const canShowBookButton = isUser && timeslots.length > 0;
  const currentUser = getCurrentUser() 
  const [ selectedSlot, setSelectedSlot] = useState(null)
 
  return (
    <Grid container spacing={1} className="timeslot-list">
      <Grid item md={ canShowBookButton ? 9 : 12} style={{ height: "200px", overflow:"auto", paddingLeft: isUser ? "10px" : "50px" }}>
        <Grid container spacing={2}>
          {timeslots.map((timeslot) => (
            <TimeSlot
              key={timeslot.startTime}
              timeslot={timeslot}
              onBook={() => setSelectedSlot(timeslot)}
            />
          ))}
        </Grid>
      </Grid>
      {canShowBookButton && (
        <Grid
          item
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            float: "right"
          }}
        >
          { selectedSlot && <Typography>
            You have selected slot with Admin at {selectedSlot.startTime} to {selectedSlot.endTime}
          </Typography>
          }
          <Button variant="contained" onClick={() => onBook(selectedSlot) }>
            Book Slot
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

export default TimeslotList;
