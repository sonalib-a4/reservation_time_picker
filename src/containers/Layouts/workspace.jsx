import React, { useState } from 'react';

const MeetingForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [minCapacity, setMinCapacity] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title,
      startTime,
      endTime,
      duration,
      maxCapacity,
      minCapacity
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Availability Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </div>
      <div>
        <label>Availability End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <div>
        <label>Meeting Duration (in minutes):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>
      <div>
        <label>Max Capacity:</label>
        <input type="number" value={maxCapacity} onChange={(e) => setMaxCapacity(e.target.value)} required />
      </div>
      <div>
        <label>Min Capacity:</label>
        <input type="number" value={minCapacity} onChange={(e) => setMinCapacity(e.target.value)} required />
      </div>
      <button type="submit">Create Meeting</button>
    </form>
  );
};

const Timeslot = ({ timeslot, onBook }) => {
  const { startTime, endTime, capacity, booked } = timeslot;

  return (
    <div className={`timeslot ${booked ? 'booked' : ''}`} onClick={onBook}>
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
        <Timeslot key={timeslot.startTime} timeslot={timeslot} onBook={() => onBook(timeslot)} />
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
      const startTimeString = startTimeObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      startTimeObj.setMinutes(startTimeObj.getMinutes() + durationInMinutes);
      const endTimeString = startTimeObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      const timeslot = {
        startTime: startTimeString,
        endTime: endTimeString,
        capacity: maxCapacity,
        booked: false
      };

      generatedTimeslots.push(timeslot);
    }

    setMeetings([...meetings, meeting]);
    setTimeslots(generatedTimeslots);
  };

  const handleTimeslotBook = (selectedTimeslot) => {
    const updatedTimeslots = timeslots.map((timeslot) => {
      if (timeslot.startTime === selectedTimeslot.startTime && timeslot.endTime === selectedTimeslot.endTime) {
        return {
          ...timeslot,
          booked: true
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
};

export default Workspace;