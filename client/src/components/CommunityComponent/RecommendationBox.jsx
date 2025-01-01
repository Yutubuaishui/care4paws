import React from 'react'
import RecommendationCard from './RecommendationCard'
import "./RecommendationBox.css"
import { IoIosPeople } from "react-icons/io";

function RecommendationBox() {
    const handleAddClick = () =>{
        console.log("Add account to follow life")
      }
  return (
    <div className='RecBox'>
    <div className = "BoxTitle">People you may know</div>
    <RecommendationCard
        avatar="https://via.placeholder.com/50"
        name="John Doe"
        description="Animal rights activist"
        onAdd={handleAddClick}
        />
        <RecommendationCard
        avatar="https://via.placeholder.com/50"
        name="Community Group"
        description="Local animal shelter"
        onAdd={handleAddClick}
        />
    </div>
  )
}

export default RecommendationBox