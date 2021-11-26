import React from "react";

import "./custom-input.styles.scss";

const CustomInput = (props) => (
    <div className="input-with-icon">
        <img src={props.image} alt={props.alt} />
        <input
            min={props.minValue}
            defaultValue={props.value}
            pattern="[0-9]"
            type={props.inputType}
            placeholder={props.placeholder}
            onFocus={props.activeState}
            onBlur={props.leaveState}
            onChange={props.billHandleChange || props.peopelCountHandleChange}
        />
    </div>
);

export default CustomInput;
