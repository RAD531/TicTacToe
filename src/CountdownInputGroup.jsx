import React from 'react';
import { Col } from "reactstrap";

const CountdownInputGroup = ({ inputGroupHours, inputGroupMinutes, inputGroupSeconds, setHours, setMinutes, setSeconds }) => {

  return (
    <>
      <Col md="4">
        <div className="form-floating">
          <input
            type="number"
            min="0"
            max="24"
            className="form-control"
            placeholder="Hours"
            value={inputGroupHours}
            onChange={(e) => setHours(parseInt(e.target.value, 10))}
          />
          <label htmlFor="floatingInput">Hours</label>
        </div>
      </Col>
      <Col md="4">
        <div className="form-floating">
          <input
            type="number"
            min="0"
            max="59"
            className="form-control"
            placeholder="Minutes"
            value={inputGroupMinutes}
            onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
          />
          <label htmlFor="floatingInput">Minutes</label>
        </div>
      </Col>
      <Col md="4">
        <div className="form-floating">
          <input
            type="number"
            min="0"
            max="59"
            className="form-control"
            placeholder="Seconds"
            value={inputGroupSeconds}
            onChange={(e) => setSeconds(parseInt(e.target.value, 10))}
          />
          <label htmlFor="floatingInput">Seconds</label>
        </div>
      </Col>
    </>
  );
};

export default CountdownInputGroup;
