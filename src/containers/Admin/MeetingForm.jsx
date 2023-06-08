import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { adminTimeSlots, isAdmin } from "../../services/useAuth";

export function MeetingForm({ onSubmit, setTimeslots }) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(dayjs().format("HH:mm"));
  const [endTime, setEndTime] = useState(dayjs().format("HH:mm"));

  const handleEndTimeChange = (newValue) => {
    if (dayjs(newValue).isAfter(dayjs(startTime))) {
      setEndTime(newValue);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      startTime,
      endTime,
      duration,
      maxCapacity,
      date,
    });
  };

  const currentDate = new Date();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const onDateChange = (e) => {
    setDate(e);
    let timeslotList = adminTimeSlots[e.toLocaleDateString()] || [];
    setTimeslots([...timeslotList]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item md={isAdmin() ? 6 : 12}>
          <Calendar
            onChange={(e) => onDateChange(e)}
            value={date}
            minDate={currentDate}
          />
        </Grid>
        {isAdmin() && (
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TextField
                  value={title}
                  label="Title"
                  type="text"
                  variant="outlined"
                  onChange={(e) => handleTitleChange(e)}
                />
              </Grid>
              <Grid item md={6}>
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
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TimePicker
                      label="Start Time"
                      ampm={false}
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      disablePast
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TimePicker
                      disablePast
                      label="End Time"
                      value={endTime}
                      ampm={false}
                      onChange={handleEndTimeChange}
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
            <Grid
              item
              md={6}
              sx={{ marginTop: "4%", marginLeft: "28%", paddingBottom: "2%" }}
            >
              <Button variant="contained" type="submit">
                Create Slots
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </form>
  );
}

export default MeetingForm;
