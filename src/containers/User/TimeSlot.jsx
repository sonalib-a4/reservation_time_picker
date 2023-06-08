import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Grid, Button, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BrowserStorageService } from "../../services/browser_storage_service";

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