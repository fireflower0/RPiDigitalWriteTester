import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 300px
`;
const LabelV = styled.div`
  height: 30px;
  background: red;
  color: white;
  text-align: center;
`;
const LabelGnd = styled.div`
  height: 30px;
  background: black;
  color: white;
  text-align: center;
`;
const LabelGpio = styled.div`
  height: 30px;
  background: green;
  color: white;
  text-align: center;
`;
const LabelOther = styled.div`
  height: 30px;
  background: blue;
  color: white;
  text-align: center;
`;
const Button = styled.button`
  font-weight: bold;
  border-radius: 8px;
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 5px;
`;

const App = () => {
  const serverUrl = 'http://{ユーザ名}.local:5000';
  const pins = [
    { label: '3.3V', type: 'vcc', value: 100 },
    { label: '5V', type: 'vcc', value: 101 },
    { label: 'GPIO02 SDA', type: 'gpio', value: 2 },
    { label: '5V', type: 'vcc', value: 102 },
    { label: 'GPIO03 SCL', type: 'gpio', value: 3 },
    { label: 'GND', type: 'gnd', value: 200 },
    { label: 'GPIO04', type: 'gpio', value: 4 },
    { label: 'GPIO14 TXD', type: 'gpio', value: 14 },
    { label: 'GND', type: 'gnd', value: 201 },
    { label: 'GPIO15 RXD', type: 'gpio', value: 15 },
    { label: 'GPIO17', type: 'gpio', value: 17 },
    { label: 'GPIO18', type: 'gpio', value: 18 },
    { label: 'GPIO27', type: 'gpio', value: 27 },
    { label: 'GND', type: 'gnd', value: 202 },
    { label: 'GPIO22', type: 'gpio', value: 22 },
    { label: 'GPIO23', type: 'gpio', value: 23 },
    { label: '3.3V', type: 'vcc', value: 103 },
    { label: 'GPIO24', type: 'gpio', value: 24 },
    { label: 'GPIO10 MOSI', type: 'gpio', value: 10 },
    { label: 'GND', type: 'gnd', value: 203 },
    { label: 'GPIO09 MISO', type: 'gpio', value: 9 },
    { label: 'GPIO25', type: 'gpio', value: 25 },
    { label: 'GPIO11 SCLK', type: 'gpio', value: 11 },
    { label: 'GPIO08', type: 'gpio', value: 8 },
    { label: 'GND', type: 'gnd', value: 204 },
    { label: 'GPIO07', type: 'gpio', value: 7 },
    { label: 'ID_SD', type: 'other', value: 300 },
    { label: 'ID_SC', type: 'other', value: 301 },
    { label: 'GPIO05', type: 'gpio', value: 5 },
    { label: 'GND', type: 'gnd', value: 205 },
    { label: 'GPIO06', type: 'gpio', value: 6 },
    { label: 'GPIO12', type: 'gpio', value: 12 },
    { label: 'GPIO13', type: 'gpio', value: 13 },
    { label: 'GND', type: 'gnd', value: 206 },
    { label: 'GPIO19', type: 'gpio', value: 19 },
    { label: 'GPIO16', type: 'gpio', value: 16 },
    { label: 'GPIO26', type: 'gpio', value: 26 },
    { label: 'GPIO20', type: 'gpio', value: 20 },
    { label: 'GND', type: 'gnd', value: 207 },
    { label: 'GPIO21', type: 'gpio', value: 21 },
  ];

  const fetchDigitalWrite = (query = '') => {
    fetch(`${serverUrl}/d-write?${query}`, {
      method: 'GET',
      mode: 'no-cors',
      credentials: 'same-origin',
    })
  };

  const digitalWriteHigh = (pin) => {
    fetchDigitalWrite(`pin=${pin}&status=high`);
  };

  const digitalWriteLow = (pin) => {
    fetchDigitalWrite(`pin=${pin}&status=low`);
  };

  const makeCell = (pin) => {
    let form = null;
    if (pin.type === 'vcc') {
      form = <LabelV key={pin.value} >{pin.label}</LabelV>;
    } else if (pin.type === 'gnd') {
      form = <LabelGnd key={pin.value} >{pin.label}</LabelGnd>;
    } else if (pin.type === 'gpio') {
      form = (
        <LabelGpio key={pin.value} >{pin.label}
          <Button onClick={v => digitalWriteHigh(v.target.value)} value={pin.value} >
            High
          </Button>
          <Button onClick={v => digitalWriteLow(v.target.value)} value={pin.value} >
            Low
          </Button>
        </LabelGpio>
      );
    } else {
      form = <LabelOther key={pin.value} >{pin.label}</LabelOther>
    }
    return form;
  };

  return (
    <FormWrapper>
      {pins.map(pin => makeCell(pin))}
    </FormWrapper>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
