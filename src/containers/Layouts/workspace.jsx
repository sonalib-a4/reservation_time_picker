import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Grid, Button } from "@mui/material";
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
    console.log("date:", date);
    console.log("title:", title);
    console.log("startTime:", startTime);
    console.log("endTime:", endTime);
    console.log("duration:", duration);
    console.log("maxCapacity:", maxCapacity);
    console.log("minCapacity:", minCapacity);
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
        <Grid container>
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
              <Grid item md={6} sx={{ marginRight: "1%", marginTop: "2%" }}>
                <TextField
                  label="Min Capacity"
                  type="number"
                  variant="outlined"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
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

  return (
    <div className={`timeslot ${booked ? "booked" : ""}`} onClick={onBook}>
      <span>{startTime}</span> - <span>{endTime}</span>
      <span className="capacity">Capacity: {capacity}</span>
      {booked && <span className="status">Booked</span>}
    </div>
  );
};

const TimeslotList = ({ timeslots, onBook }) => {
  return (
    <div className="timeslot-list">
      {timeslots.map((timeslot) => (
        <Timeslot
          key={timeslot.startTime}
          timeslot={timeslot}
          onBook={() => onBook(timeslot)}
        />
      ))}
    </div>
  );
};

export function Workspace() {
  const [meetings, setMeetings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);

  const handleMeetingSubmit = (meeting) => {
    const { startTime, endTime, duration, maxCapacity, minCapacity } = meeting;

    const startTimeObj = new Date(`2000-01-01T${startTime}`);
    const endTimeObj = new Date(`2000-01-01T${endTime}`);
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
      };

      generatedTimeslots.push(timeslot);
    }

    setMeetings([...meetings, meeting]);
    setTimeslots(generatedTimeslots);
  };

  const handleTimeslotBook = (selectedTimeslot) => {
    const updatedTimeslots = timeslots.map((timeslot) => {
      if (
        timeslot.startTime === selectedTimeslot.startTime &&
        timeslot.endTime === selectedTimeslot.endTime
      ) {
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
