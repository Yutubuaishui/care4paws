import React, { useState } from "react";
import "./RegistrationModal.css";
import PaymentModal from "./PaymentModal";

const RegistrationModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    contact: "",
    numberOfGuests: 0,
    guests: [],
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...formData.guests];
    updatedGuests[index][field] = value;
    setFormData({ ...formData, guests: updatedGuests });
  };

  const handleAddGuestFields = () => {
    setFormData({
      ...formData,
      guests: [...formData.guests, { name: "", age: "" }],
    });
  };

  const handleRemoveGuestField = (index) => {
    const updatedGuests = formData.guests.filter((_, i) => i !== index);
    setFormData({ ...formData, guests: updatedGuests });
  };

  const handleSubmit = () => {
    // Perform form validation and submit logic
    console.log("Registration Form Data:", formData);

    // Navigate to payment modal if there's a fee
    setShowPaymentModal(true);
  };

  if (showPaymentModal) {
    return <PaymentModal closeModal={closeModal} email={formData.email} />;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Event Registration</h2>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Contact Number:
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </label>
          <label>
            Number of Guests:
            <input
              type="number"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={(e) => {
                const newCount = parseInt(e.target.value, 10) || 0;
                const guests = [...formData.guests];
                while (guests.length < newCount) guests.push({ name: "", age: "" });
                while (guests.length > newCount) guests.pop();
                setFormData({ ...formData, numberOfGuests: newCount, guests });
              }}
            />
          </label>
          {formData.guests.map((guest, index) => (
            <div key={index} className="guest-fields">
              <label>
                Guest {index + 1} Name:
                <input
                  type="text"
                  value={guest.name}
                  onChange={(e) =>
                    handleGuestChange(index, "name", e.target.value)
                  }
                />
              </label>
              <label>
                Guest {index + 1} Age:
                <input
                  type="number"
                  value={guest.age}
                  onChange={(e) =>
                    handleGuestChange(index, "age", e.target.value)
                  }
                />
              </label>
              <button type="button" onClick={() => handleRemoveGuestField(index)}>
                Remove
              </button>
            </div>
          ))}
          <p>Any updates will be sent to the provided email.</p>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
