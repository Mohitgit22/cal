import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function EventScheduler() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({});

  const handleDateClick = date => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (date, details) => {
    setEventDetails(prevDetails => ({
      ...prevDetails,
      [date.toDateString()]: details,
    }));
  };

  const EventDetailsForm = ({ selectedDate, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = e => {
      setTitle(e.target.value);
    };

    const handleDescriptionChange = e => {
      setDescription(e.target.value);
    };

    const handleSubmit = e => {
      e.preventDefault();
      onSave(selectedDate, { title, description });
      setTitle('');
      setDescription('');
    };

    return (
      <div>
        <h3>Enter Details for {selectedDate.toDateString()}:</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <Calendar
        value={selectedDate}
        onChange={handleDateClick}
      />
      {eventDetails[selectedDate.toDateString()] && (
        <div>
          <h3>Details for {selectedDate.toDateString()}:</h3>
          <p>{eventDetails[selectedDate.toDateString()].title}</p>
          <p>{eventDetails[selectedDate.toDateString()].description}</p>
          {/* Display other details as needed */}
        </div>
      )}
      <EventDetailsForm selectedDate={selectedDate} onSave={handleFormSubmit} />
    </div>
  );
}

export default EventScheduler;