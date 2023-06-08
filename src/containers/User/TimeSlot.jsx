import React from "react";
import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import "react-calendar/dist/Calendar.css";

export function TimeSlot({ timeslot, onBook }){
    const { startTime, endTime, capacity, booked } = timeslot;
    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: booked ? '#8cdd8c' : '#e91e63',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: 'white',
      cursor: booked ?  'auto' : 'pointer' 
    }));
    return (
      <Grid item xs={2} className={`timeslot ${booked ? 'booked' : ''}`} onClick={onBook}>
        <Item disabled={booked ? true : false }><span>{startTime}</span> - <span>{endTime}</span>
              <span>Capacity: {capacity} - </span>
        </Item>
      </Grid>
    );
};

export default TimeSlot;