import React from "react";

import "./percentage.styles.scss";

const Percentage = ({ isClicked, handleButtonClick, getTipValue, value }) => {
    return (
        <button
            className={isClicked ? "clicked" : ""}
            onClick={(event) => {
                handleButtonClick();
                getTipValue(event);
            }}
        >{`${value}%`}</button>
    );
};

export default Percentage;
