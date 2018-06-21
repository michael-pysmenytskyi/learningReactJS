import React, { Fragment } from 'react';
import { string, func } from 'prop-types'

export default function Input({ value, title, onInputChange, type }) {
  return (
    <Fragment>
      <label>{title}</label>
      <br />
      <input
          value={value}
          onChange={(e) => {
              onInputChange(e.target.value);
          }}
          type={type}
          placeholder={title.toLowerCase()}
      />
    </Fragment>);
};

Input.propTypes = {
  value: string.isRequired,
  title: string.isRequired,
  error: string,
  type: string,
  onInputChange: func.isRequired
};

Input.defaultProps = {
  type: 'text',
  error: ''
};