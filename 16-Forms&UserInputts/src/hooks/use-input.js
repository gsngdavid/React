import { useReducer } from "react";

const useInput = validateValue => {
    const inputStateReducer = (state, action) => {
        if(action.type === 'VALUE_INPUT') {
            return {value: action.value, isTouched: state.isTouched};
        }
        if(action.type === 'BLUR') {
            return {value: state.value, isTouched: true};
        }
        if(action.type === 'RESET') {
            return {value: '', isTouched: false
        };
        }
        return {value: '', isTouched: false};
    }
    const [inputState, dispatch] = useReducer(inputStateReducer, {value: '', isTouched: false})

    const valueIsValid = validateValue(inputState.value);
    const valueIsInvalid = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = event => {
        dispatch({type: 'VALUE_INPUT', value: event.target.value});
    }

    const valueBlurHandler = event => {
        dispatch({type: 'BLUR'});
    }

    const resetValue = () => {
        dispatch({type: 'RESET'});
    }

    return {
        enteredValue: inputState.value,
        valueIsValid,
        valueIsInvalid,
        valueChangeHandler,
        valueBlurHandler,
        resetValue}
}

export default useInput;