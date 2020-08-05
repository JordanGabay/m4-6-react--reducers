import React from 'react'
import styled from 'styled-components';
import SeatAvailable from "./assets/seat-available.svg";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";


export default function Seat({isBooked, rowName, seatNum, seatID, price}) {
    const toolTipContent = `Row ${rowName}, Seat ${seatNum} - $${price}`
    return (
      <Tippy content={toolTipContent}>
        <SeatButton>
          <SeatImg isBooked={isBooked} src={SeatAvailable} alt={seatID} />
        </SeatButton>
      </Tippy>
    );
}

const SeatImg = styled.img`
  cursor: pointer;
  filter: ${(props) => props.isBooked && "grayscale(100%)"};
  padding: 5px;
`;

const SeatButton = styled.button`
border:none;
background-color: transparent;
`