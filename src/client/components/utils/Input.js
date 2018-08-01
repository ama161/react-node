import React from 'react';

const Input = ({label, placeholder, type, value, onChange, className}) => (
    <div className={className}>
        {(label) ? <label>{label}</label> : null}
        <input
            placeholder = {(placeholder) ? placeholder : null}
            type = {type}
            value = {value}
            onChange = {onChange}
        />
    </div>
)

export default Input;