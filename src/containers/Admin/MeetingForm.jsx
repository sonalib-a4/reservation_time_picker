import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Grid, Button, Paper, Box } from '@mui/material';
import React, { useState } from "react";
import Calendar from "react-calendar";
import { BrowserStorageService } from "../../services/browser_storage_service";


export function MeetingForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [duration, setDuration] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [date, setDate] = useState(new Date());
      
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
    
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
    const handleDurationChange = (e) => {
      setDuration(e.target.value);
    };
    return (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} > 
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
    );
};

export default MeetingForm;