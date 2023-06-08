import React, { useState, useEffect } from "react";
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
import { MeetingForm } from '../Admin/MeetingForm';
import { TimeslotList } from '../User/TimeslotList';

export function Workspace() {
  const [meetings, setMeetings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  let adminTimeSlots = BrowserStorageService.get('adminTimeSlots') || {};
  const isAdmin = BrowserStorageService.get('role') === 'admin';
  
  useEffect(() => {
    let date = new Date();
    let storedTimeslots = adminTimeSlots[date.toLocaleDateString()] || []
    setTimeslots([...storedTimeslots]);
    
  }, []);

  const handleMeetingSubmit = (meeting) => {
    const { startTime, endTime, duration, maxCapacity, date } = meeting;

    const startTimeObj = new Date(`${startTime}`);
    const endTimeObj = new Date(`${endTime}`);
    const durationInMinutes = parseInt(duration);

    const generatedTimeslots = [];
    let dayToString = new Date(date);
    adminTimeSlots[dayToString.toLocaleDateString()] = []
    while (startTimeObj < endTimeObj) {
      
      const startTimeString = startTimeObj.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      startTimeObj.setMinutes(startTimeObj.getMinutes() + durationInMinutes);
      const endTimeString = startTimeObj.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      const timeslot = {
        startTime: startTimeString,
        endTime: endTimeString,
        capacity: maxCapacity,
        booked: false,
        bookedCount: 0
      };
      adminTimeSlots[dayToString.toLocaleDateString()].push(timeslot)
      generatedTimeslots.push(timeslot);
    }

    setMeetings([...meetings, meeting]);
    BrowserStorageService.put("adminTimeSlots", adminTimeSlots);
    setTimeslots(generatedTimeslots);
  };

  const handleTimeslotBook = () => {
    let selectedTimeslot = {}
    selectedTimeslot.bookedCount += 1
    const updatedTimeslots = timeslots.map((timeslot) => {
      if (timeslot.startTime === selectedTimeslot.startTime && timeslot.endTime === selectedTimeslot.endTime && parseInt(timeslot.capacity) === selectedTimeslot.bookedCount) {
        return {
          ...timeslot,
          booked: true,
        };
      }

      return timeslot;
    });
    setTimeslots(updatedTimeslots);
  };

  return (
    <div>
      <h2>Reservation Time Picker</h2>
      <h4>{ isAdmin ? 'Define Meetings' : 'Book a slot' }</h4>
      <Grid
      container
      spacing={3}
      style={{
        paddingTop: "2%",
        outline: "1px solid rgb(219, 219, 219)",
        marginLeft: "20%",
        marginRight: "20%",
        marginTop: "3%",
        width: "60%",
        paddingLeft: "2%",
      }}
      justifyContent="center"
    >
      <MeetingForm onSubmit={handleMeetingSubmit} />
    </Grid>
    <Grid
      container
      spacing={3}
      style={{
        paddingTop: "2%",
        outline: "1px solid rgb(219, 219, 219)",
        marginLeft: "20%",
        marginRight: "20%",
        marginTop: "3%",
        marginBottom: "3%",
        width: "60%",
        paddingLeft: "2%",
      }}
      justifyContent="center"
    >
      <TimeslotList timeslots={timeslots} onBook={handleTimeslotBook} isUser={!isAdmin}/>
    </Grid>
    </div>
  );
}

export default Workspace;
