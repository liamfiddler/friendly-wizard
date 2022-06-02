import * as React from 'react';

const YesNo = ({ name }) => (
  <div>
    <label>
      <input type="radio" name={name} value="Yes" /> Yes
    </label>
    <label>
      <input type="radio" name={name} value="No" /> No
    </label>
  </div>
);

export default YesNo;
