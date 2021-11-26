import React from 'react'

import './App.scss';

import PercentagesList from './components/percentages-list/percentages-list.component';
import CustomInput from './components/custom-input/custom-input.component';


import logo from './images/logo.svg'
import DollarIcon from './images/icon-dollar.svg'
import PersonIcon from './images/icon-person.svg'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      bill: 0.00.toFixed(2),
      tipValue: 0,
      numOfPeople: 1,
      tipAmount: 0.00.toFixed(2),
      total: 0.00.toFixed(2)
    }
  }

  errorElement;

  componentDidMount() {
    this.errorElement = document.querySelector('#input-with-error h2')
  }

  //#region active and leave state events 
  activeState = (event) => {
    const parentElement = event.target.parentElement;
    parentElement.classList.contains('input-with-icon')
      ? parentElement.classList.add("active")
      : event.target.classList.add("active");
  }

  leaveState = (event) => {
    const parentElement = event.target.parentElement;
    if (parentElement.classList.contains('input-with-icon')) {
      parentElement.classList.remove("active")
    } else {
      event.target.classList.remove("active");
    }
  }
  //#endregion

  //#region Change events
  billHandleChange = (event) => {
    this.setState({ bill: Number(event.target.value) }, () => {
      if (this.state.tip === 0 || this.state.numOfPeople === 0) return;

      this.calcResult();
    })
  }


  peopelCountHandleChange = (event) => {
    const value = event.target.value;

    if (Number(value) === 0 && value !== '') {
      this.errorElement.classList.add('show')
      this.errorElement.nextElementSibling.classList.add("red-border")
    }
    else {
      this.errorElement.classList.remove('show')
      this.errorElement.nextElementSibling.classList.remove("red-border")
    }

    this.setState({ numOfPeople: !value ? null : parseInt(value) }, () => this.calcResult())
  }
  //#endregion

  calcResult = () => {
    if (this.state.numOfPeople <= 0 || !this.state.numOfPeople || !this.state.tipValue) {
      return this.setState({ tipAmount: 0.00.toFixed(2), total: 0.00.toFixed(2) })
    };

    const tipAmount = this.state.bill * this.state.tipValue / 100 / this.state.numOfPeople;
    const total = (this.state.bill / this.state.numOfPeople) + tipAmount;
    this.setState({ tipAmount: tipAmount.toFixed(2), total: total.toFixed(2) })

  }

  getTipValue = (event) => {
    let value;
    //From button 
    if (event.target.nodeName === "BUTTON")
      value = Number(event.target.textContent.split('%')[0]);
    //From input
    else
      value = !event.target.value ? null : Number(event.target.value)

    this.setState({ tipValue: !value ? null : value.toFixed(2) }, () => {
      this.calcResult();
    })
  }

  render() {

    return (
      <div className="App" >
        <img className='logo' src={ logo } alt="Page logo saying Splitter" />
        <div className="container">
          <div>
            <h2>Bill</h2>
            <CustomInput
              minValue={ 0.00 }
              value={ this.state.bill }
              image={ DollarIcon } alt='Dollar icon'
              inputType='number' placeholder='Enter the bill'
              activeState={ this.activeState }
              leaveState={ this.leaveState }
              billHandleChange={ this.billHandleChange }
            />
            <h2>Select Tip %</h2>
            <PercentagesList
              activeState={ this.activeState }
              leaveState={ this.leaveState }
              getTipValue={ this.getTipValue }
            />
            <h2>Number of People</h2>
            <div id="input-with-error">
              <h2 className="error">Can't be zero</h2>
              <CustomInput
                minValue={ 1 }
                value={ this.state.numOfPeople }
                activeState={ this.activeState }
                leaveState={ this.leaveState }
                image={ PersonIcon }
                alt='Person icon' inputType='number'
                placeholder='Enter a number'
                peopelCountHandleChange={ this.peopelCountHandleChange }
              />
            </div>
          </div>
          <div className='result'>
            <div>
              <h2>Tip Amount</h2>
              <h3>/ person</h3>
              <p>${ this.state.tipAmount }</p>
            </div>
            <div>
              <h2>Total</h2>
              <h3>/ person</h3>
              <p>${ this.state.total }</p>
            </div>
            <button onClick={ () => {
              this.setState({ tip: 0.00.toFixed(2), total: 0.00.toFixed(2), bill: 0 })
            } }>RESET</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
