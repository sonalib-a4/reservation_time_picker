import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import "react-calendar/dist/Calendar.css";
import { BrowserStorageService } from "../../services/browser_storage_service";
import { MeetingForm } from "../Admin/MeetingForm";
import { TimeslotList } from "../User/TimeslotList";
import { isAdmin, adminTimeSlotFunc, useAuth, getCurrentUser } from "../../services/useAuth";
import Sidebar from "../Components/Sidebar";

export function Workspace() {
  const [meetings, setMeetings] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const isLoggedIn = useAuth();
  const adminTimeSlots = adminTimeSlotFunc();
  const currentUser = getCurrentUser() 

  useEffect(() => {
    let date = new Date();
    let storedTimeslots = adminTimeSlots[date.toLocaleDateString()] || [];
    setTimeslots([...storedTimeslots]);
  }, []);

  const handleMeetingSubmit = (meeting) => {
    const { startTime, endTime, duration, maxCapacity, date } = meeting;

    const startTimeObj = new Date(`${startTime}`);
    const endTimeObj = new Date(`${endTime}`);
    const durationInMinutes = parseInt(duration);

    const generatedTimeslots = [];
    let dayToString = new Date(date);
    adminTimeSlots[dayToString.toLocaleDateString()] = [];
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
        usernames: [],
        disabled: false
      };
      adminTimeSlots[dayToString.toLocaleDateString()].push(timeslot);
      generatedTimeslots.push(timeslot);
    }

    setMeetings([...meetings, meeting]);
    // set admintime slots date wise in local storage so that we can use it while showing timeslots at user end
    BrowserStorageService.put("adminTimeSlots", adminTimeSlots);
    setTimeslots(generatedTimeslots);
  };

  const handleTimeslotBook = (selectedTimeslot) => {
    selectedTimeslot.bookedCount += 1;
    const updatedTimeslots = timeslots.map((timeslot) => {
      timeslot.disabled = true;
      if (
        timeslot.startTime === selectedTimeslot.startTime &&
        timeslot.endTime === selectedTimeslot.endTime &&
        parseInt(timeslot.capacity) === selectedTimeslot.bookedCount
      ) {
        timeslot.usernames.push(currentUser);
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
    isLoggedIn ? 
      (<div>
        <Sidebar />
        <h2>Reservation Time Picker</h2>
        <h4>{isAdmin() ? "Define Meetings" : "Book a slot"}</h4>
        <Grid
          container
          spacing={3}
          style={{
            paddingTop: "1%",
            outline: "1px solid rgb(219, 219, 219)",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "3%",
            width: "60%",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingBottom: "1%",
          }}
          justifyContent="center"
        >
          <MeetingForm
            onSubmit={handleMeetingSubmit}
            setTimeslots={setTimeslots}
          />
        </Grid>
        <Grid
          container
          sx={{
            outline: "1px solid rgb(219, 219, 219)",
            marginLeft: "20%",
            marginTop: "3%",
            marginBottom: "3%",
            padding: "1%",
            width: "60%",
          }}
        >
          <TimeslotList
            timeslots={timeslots}
            onBook={handleTimeslotBook}
          />
        </Grid>
      </div>)
      : <div></div>
  );
}

export default Workspace;
