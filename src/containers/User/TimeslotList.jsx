import React, { useState } from "react";
import { Grid, Button, Box } from '@mui/material';
import "react-calendar/dist/Calendar.css";
import { TimeSlot } from './TimeSlot';


export function TimeslotList({ timeslots, onBook, isUser }) {
    const [timeSlot, setTimeSlot] = useState({});
    const canShowBookButton = isUser && timeslots.length > 0
    
    return (
        
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} className='timeslot-list'>
        <Grid container item md={6} >
            {timeslots.map((timeslot) => (
            <TimeSlot
                key={timeslot.startTime}
                timeslot={timeslot}
                onClick={() => setTimeSlot(timeslot)}
            />
            ))}
        </Grid>
            { canShowBookButton &&
            <Grid item md={6} sx={{ marginTop: "2%", paddingBottom: "2%" }}>
            <Button variant="contained" onClick={onBook}>
                Book Slot
            </Button>
            </Grid>
            }
        </Grid>
        </Box>
    );
};

export default TimeslotList;