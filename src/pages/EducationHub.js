import React from "react";
import { Link } from "react-router-dom";

const EducationHub = () => {
  return (
    <div>
      <h1>Education Page</h1>
      <button>
        <Link to="/coordinator/be-pet-experts/create">Add Post</Link>
      </button>
    </div>
  );
};

export default EducationHub;
