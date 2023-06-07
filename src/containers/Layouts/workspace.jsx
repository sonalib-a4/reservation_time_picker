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


const MeetingForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [minCapacity, setMinCapacity] = useState("1");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      startTime,
      endTime,
      duration,
      maxCapacity,
      minCapacity,
      date,
    });
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log("title:", e.target.value);
  };
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    console.log("title:", e.target.value);
  };
  return (
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}> 
          <Grid item md={6}>
            <Calendar
              onChange={(newValue) => {
                setDate(newValue);
              }}
              value={date}
            />
          </Grid>
          <Grid item md={6}>
            <Grid container>
              <Grid item md={6} sx={{ marginRight: "1%", marginTop: "2%" }}>
                <TextField
                  value={title}
                  label="Title"
                  type="text"
                  variant="outlined"
                  onChange={(e) => handleTitleChange(e)}
                />
              </Grid>
              <Grid item md={6} sx={{ marginRight: "1%", marginTop: "2%" }}>
                <TextField
                  label="Duration(in minutes)"
                  type="number"
                  variant="outlined"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </Grid>
            </Grid>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <Grid
                  container
                  sx={{
                    width: "auto",
                  }}
                >
                  <Grid
                    item
                    md={6}
                    sx={{
                      marginTop: "2%",
                      marginRight: "20px",
                    }}
                  >
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                    />
                  </Grid>
                  <Grid item md={6} sx={{ marginTop: "2%" }}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                    />
                  </Grid>
                </Grid>
              </DemoContainer>
            </LocalizationProvider>
            <Grid container>
              <Grid item md={6} sx={{ marginRight: "1%", marginTop: "2%" }}>
                <TextField
                  label="Max Capacity"
                  type="number"
                  variant="outlined"
                  value={maxCapacity}
                  onChange={(e) => setMaxCapacity(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item md={6} sx={{ marginTop: "2%", paddingBottom: "2%" }}>
              <Button variant="contained" type="submit">
                Create Slots
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};



const Timeslot = ({ timeslot, onBook }) => {
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



const TimeslotList = ({ timeslots, onBook }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} className='timeslot-list'>
        {timeslots.map((timeslot) => (
          <Timeslot
            key={timeslot.startTime}
            timeslot={timeslot}
            onBook={() => onBook(timeslot)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export function Workspace() {
  const [meetings, setMeetings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  const handleMeetingSubmit = (meeting) => {
    const { startTime, endTime, duration, maxCapacity, minCapacity } = meeting;

    const startTimeObj = new Date(`${startTime}`);
    const endTimeObj = new Date(`${endTime}`);
    const durationInMinutes = parseInt(duration);

    const generatedTimeslots = [];

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

      generatedTimeslots.push(timeslot);
    }

    setMeetings([...meetings, meeting]);
    setTimeslots(generatedTimeslots);
  };

  const handleTimeslotBook = (selectedTimeslot) => {
    selectedTimeslot.bookedCount += 1
    console.log("selectedTimeslot==", selectedTimeslot)
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
      <MeetingForm onSubmit={handleMeetingSubmit} />
      <TimeslotList timeslots={timeslots} onBook={handleTimeslotBook} />
    </div>
  );
}

export default Workspace;
