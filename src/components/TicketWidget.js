import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "../SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  const {state} = useContext(SeatContext)
  const { numOfRows, seatsPerRow, hasLoaded, bookedSeats, seats } = state

  if (hasLoaded) {
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>

              {range(seatsPerRow).map((seatIndex) => {
                const seatNum = getSeatNum(seatIndex);
                const seatID = `${rowName}-${seatNum}`;
                const isBooked = bookedSeats[seatID];
                const price = seats[seatID].price;

                return (
                  <Seat
                    key={seatID}
                    isBooked={isBooked}
                    rowName={rowName}
                    seatNum={seatNum}
                    seatID={seatID}
                    price={price}
                  />
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <ProgressWrapper>
        <CircularProgress />
      </ProgressWrapper>
    );
  }
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  padding: 8px;
  background: #eee;
`;

const ProgressWrapper = styled(Wrapper)`
  background: transparent;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  position: absolute;
  left: -80px;
`;

export default TicketWidget;
