import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

  const {
    enteredValue: enteredInputName,
    enteredValueIsValid: nameInputIsValid,
    enteredValueIsInvalid: nameInputIsInvalid,
    valueChangeHandler: enteredInputNameChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    resetInput: nameInputReset
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: enteredEmailInput,
    enteredValueIsValid: emailInputIsValid,
    enteredValueIsInvalid: emailInputIsInvalid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    resetInput: emailInputReset
  } = useInput(value => value.includes('@'));
  
  let formIsValid = false;

  if(nameInputIsValid && emailInputIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();
    
    if(!nameInputIsValid || !emailInputIsValid) {
      return;
    }
    
    nameInputReset();
    emailInputReset();
    console.log(enteredInputName.trim());
    console.log(enteredEmailInput.trim());
  }

  const nameInputClasses = `${nameInputIsInvalid ? 'form-control invalid' : 'form-control'}`;
  const emailInputClasses = `${emailInputIsInvalid ? 'form-control invalid' : 'form-control'}`;

  return (
    <form onSubmit={formSubmissionHandler}>

      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredInputName}
          onBlur={nameInputBlurHandler}
          onChange={enteredInputNameChangeHandler}
          />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty!</p>}
      </div>
      
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='text'
          id='email'
          value={enteredEmailInput}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          />
          {emailInputIsInvalid && <p className="error-text">Please enter a valid email!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
