import React from "react";

import Percentage from "../percentage/percentage.component";
// import CustomInput from "../custom-input/custom-input.component";

import "./percentages-list.styles.scss";

class PercentagesList extends React.Component {
    constructor() {
        super();

        this.state = {
            percentages: [
                { id: 0, value: 5, isClicked: false },
                { id: 1, value: 10, isClicked: false },
                { id: 2, value: 15, isClicked: false },
                { id: 3, value: 20, isClicked: false },
                { id: 4, value: 50, isClicked: false },
            ],
            customInputIsClicked: false,
        };
    }

    render() {
        let { percentages, customInputIsClicked } = this.state;

        const handleButtonClick = (clickedButtonId) => {
            percentages.forEach((percentage) => {
                if (customInputIsClicked) {
                    percentage.isClicked = false;
                    return;
                }

                percentage.isClicked = percentage.id === clickedButtonId;
            });

            //Setting the state to make an update
            this.setState({ percentages });
        };

        return (
            <div className="PercentagesList">
                {percentages.map(({ id, value, isClicked }) => (
                    <Percentage
                        key={id}
                        value={value}
                        isClicked={isClicked}
                        getTipValue={this.props.getTipValue}
                        handleButtonClick={() => {
                            handleButtonClick(id);
                        }}
                    />
                ))}
                <input
                    min={0}
                    type="number"
                    placeholder="Custom"
                    onFocus={(event) => {
                        this.props.activeState(event);
                        this.setState({ customInputIsClicked: true });
                        handleButtonClick(); //! Necessary to change the click state of buttons
                    }}
                    onBlur={(event) => {
                        this.props.leaveState(event);
                        this.setState({ customInputIsClicked: false });
                    }}
                    onChange={this.props.getTipValue}
                />
            </div>
        );
    }
}
export default PercentagesList;
