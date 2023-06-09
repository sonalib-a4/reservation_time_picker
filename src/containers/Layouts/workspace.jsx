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
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    setSelectedDate(new Date());
    let date = new Date();
    let storedTimeslots = adminTimeSlots[date.toLocaleDateString()] || [];
    setTimeslots([...storedTimeslots]);
  }, []);

  const convertTimeToString = (time) => {
    return time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const handleMeetingSubmit = (meeting) => {
    const { startTime, endTime, duration, maxCapacity, date } = meeting;

    const startTimeObj = new Date(`${startTime}`);
    const endTimeObj = new Date(`${endTime}`);
    const durationInMinutes = parseInt(duration);
    const validateStartTime = convertTimeToString(startTimeObj);
    const generatedTimeslots = [];

    let dayToString = new Date(date);
    dayToString = dayToString.toLocaleDateString();

    if (durationInMinutes > (endTimeObj - startTimeObj) / (1000 * 60)) {
      alert("Duration can not be greater than selected time.");
      return;
    }    
    adminTimeSlots[dayToString] = adminTimeSlots[dayToString] || [];
    
    // check for duplicate slot generation
    let canCreateSlot = true;
    adminTimeSlots[dayToString].map((slot) => {
      if(validateStartTime === slot.startTime){
        canCreateSlot = false;
      }
    });
    if(!canCreateSlot){
      alert("You can not create duplicate slots");
      return;
    }
    
    while (startTimeObj < endTimeObj) {
      const startTimeString = convertTimeToString(startTimeObj)
      startTimeObj.setMinutes(startTimeObj.getMinutes() + durationInMinutes);
      const endTimeString = convertTimeToString(startTimeObj);

      const timeslot = {
        startTime: startTimeString,
        endTime: endTimeString,
        capacity: maxCapacity,
        booked: false,
        bookedCount: 0,
        usernames: [],
        disabled: false
      };
      adminTimeSlots[dayToString].push(timeslot);
      generatedTimeslots.push(timeslot);
    }
    setMeetings([...meetings, meeting]);
    // set admintime slots date wise in local storage so that we can use it while showing timeslots at user end
    BrowserStorageService.put("adminTimeSlots", adminTimeSlots);

    setTimeslots(adminTimeSlots[dayToString]);
  };

  const handleTimeslotBook = (selectedTimeslot) => {
    if(selectedTimeslot === null){
      alert("Please select a slot first");
      return
    }
    selectedTimeslot.bookedCount += 1;
    
    if(!selectedTimeslot.usernames.includes(currentUser))
      selectedTimeslot.usernames.push(currentUser);

    const updatedTimeslots = timeslots.map((timeslot) => {
      timeslot.disabled = true;      
      
      if (
        timeslot.startTime === selectedTimeslot.startTime &&
        timeslot.endTime === selectedTimeslot.endTime && 
        parseInt(timeslot.capacity) === selectedTimeslot.bookedCount
        ) {
          return {
            ...timeslot,
            booked: true,
          };
        }
        return timeslot;
      });

    // TODO set selected date here to set updated timeslots in admintimeslots with date
    adminTimeSlots[selectedDate?.toLocaleDateString()] = updatedTimeslots;
    BrowserStorageService.put("adminTimeSlots", adminTimeSlots);
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
            setSelectedDate={setSelectedDate}
          />
        </Grid>
        {timeslots.length > 0 &&
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
        }
      </div>)
      : <div></div>
  );
}

export default Workspace;
