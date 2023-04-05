import React, { useImperativeHandle, useRef } from "react";

const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    console.log(inputRef);

    const activation = () => inputRef.current.focus();

    useImperativeHandle(ref, () => {
        return {
            focus: activation
        };
    });

    return (
        <div
          className={`${props.classes.control} 
          ${props.inputIsValid === false ? props.classes.invalid : ''}`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    );
});

export default Input;