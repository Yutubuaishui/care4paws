import React, { useState } from "react";
import EventCard from "../../../components/CommunityComponent/EventCard";
import EventDetailsModal from "../../../components/CommunityComponent/EventDetailPage";
import "./UserEvent.css";
import { FaRegCalendarCheck } from "react-icons/fa";

function Event() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventDetails, setSelectedEventDetails] = useState(null);

  const handleOpenModal = (eventDetails) => {
    setSelectedEventDetails(eventDetails);
    setIsModalOpen(true);
    console.log("open");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventDetails(null);
  };

  const handleShare = () => {
    console.log("Event shared!");
  };

  const eventData = [
    {
      organizerPic: "https://via.placeholder.com/40",
      organizerName: "Pet Adoption Org",
      eventTitle: "Animal Rescue Fundraiser",
      eventDate: "March 20, 2024",
      eventTime: "10:00 AM",
      eventLocation: "City Park",
      eventFee: "Free",
      participantsCount: 45,
      eventPic: "https://via.placeholder.com/300",
      eventTags: ["Adoption", "Fundraiser"],
      eventType: "In-Person",
      registrationStatus: "Open",
      eventDescription: "Join us for a meaningful event to raise funds for animal rescues!",
    },
    // Add more event objects here...
  ];

  return (
    <div>
      <div className="Intro">
      <FaRegCalendarCheck size={40}
        color="493628"/>
      <h2>Mark your calendars !</h2>
      </div>
      <p>Get ready to paws and play! Check out the events near you !</p>
      <div className="EventCardContainer">
        {eventData.map((event, index) => (
          <EventCard
            key={index}
            {...event}
            onShare={handleShare}
            onClick={() => handleOpenModal(event)}
          />
        ))}
      </div>

      {/* Modal for event details */}
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        eventDetails={selectedEventDetails}
      />
    </div>
  );
}

export default Event;
