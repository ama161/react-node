import React from 'react';

const Input = ({label, placeholder, type, value, onChange, className, name, disabled = false}) => (
    <div className={className}>
        {(label) ? <label>{label}</label> : null}
        <input
            placeholder = {(placeholder) ? placeholder : null}
            type = {type}
            value = {value}
            onChange = {onChange}
            disabled = {disabled}
            name={name}
        />
    </div>
)

export default Input;