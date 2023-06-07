import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  TextField,
  Grid,
  Button,
  Paper,
  Box,
  Item,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
      sx={{
        position: "absolute",
        paddingTop: "2%",
        outline: "1px solid rgb(219, 219, 219)",
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "3%",
        width: "50%",
        paddingLeft: "2%",
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Calendar
            onChange={(newValue) => {
              setDate(newValue);
            }}
            value={date}
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{ paddingBottom: "5%" }}
            form="true"
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ marginTop: "4%", width: "80%" }}
              value={title}
              label="Title"
              type="text"
              variant="outlined"
              onChange={(e) => handleTitleChange(e)}
            />

            <TextField
              sx={{ marginTop: "4%", width: "80%" }}
              label="Duration(in minutes)"
              type="number"
              variant="outlined"
              value={duration}
              onChange={handleDurationChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <Grid container>
                  <Grid
                    item
                    md={14}
                    sx={{
                      marginTop: "4%",
                    }}
                  >
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                    />
                  </Grid>
                  <Grid item md={12} sx={{ marginTop: "4%" }}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                    />
                  </Grid>
                </Grid>
              </DemoContainer>
            </LocalizationProvider>

            <TextField
              sx={{ marginTop: "4%", width: "80%" }}
              label="Max Capacity"
              type="number"
              variant="outlined"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
            />

            <Button sx={{ marginTop: "5%" }} variant="contained" type="submit">
              Create Slots
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Timeslot = ({ timeslot, onBook }) => {
  const { startTime, endTime, capacity, booked } = timeslot;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: booked ? "#8cdd8c" : "#2196f3", // Change color to a shade of blue (#2196f3)
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    cursor: booked ? "auto" : "pointer",
    transition: "background-color 0.3s ease", // Add transition effect
    "&:hover": {
      backgroundColor: booked ? "#8cdd8c" : "#1976d2", // Change color on hover (#1976d2)
    },
  }));

  return (
    <Grid
      item
      xs={12}
      className={`timeslot ${booked ? "booked" : ""}`}
      onClick={onBook}
    >
      <Item disabled={booked ? true : false}>
        <span>{startTime}</span> - <span>{endTime}</span>
        <span>Capacity: {capacity} - </span>
      </Item>
    </Grid>
  );
};

const TimeslotList = ({ timeslots, onBook }) => {
  return (
    <Box
      sx={{
        marginLeft: "65%",
        marginTop: "3%",
        width: "20%",
        outline: "1px solid rgb(219, 219, 219)",
        padding: "1%",
        paddingBottom: "2%",
        fontWeight: "700",
      }}
    >
      Time Slots
      <Grid
        sx={{ marginTop: "2%" }}
        container
        spacing={2}
        className="timeslot-list"
      >
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
        bookedCount: 0,
      };

      generatedTimeslots.push(timeslot);
    }

    setMeetings([...meetings, meeting]);
    setTimeslots(generatedTimeslots);
  };

  const handleTimeslotBook = (selectedTimeslot) => {
    if (!selectedTimeslot.booked) {
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
    }
  };

  return (
    <div>
      <h2>Reservation Time Picker</h2>
      <Box sx={{ display: "flex", flex: "row" }}>
        <MeetingForm onSubmit={handleMeetingSubmit} />
        <TimeslotList timeslots={timeslots} onBook={handleTimeslotBook} />
      </Box>
    </div>
  );
}

export default Workspace;
