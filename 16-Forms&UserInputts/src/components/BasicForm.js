import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const {
    enteredValue: enteredFirstName,
    valueIsValid: firstNameIsValid,
    valueIsInvalid: firstNameIsInvalid,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    resetValue: resetFirstName
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: enteredLastName,
    valueIsValid: lastNameIsValid,
    valueIsInvalid: lastNameIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    resetValue: resetLastName
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: enteredEmail,
    valueIsValid: emailIsValid,
    valueIsInvalid: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    resetValue: resetEmail
  } = useInput(value => value.includes('@'));

  let formIsValid = false;
  if(firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }


  const submitHandler = event => {
    event.preventDefault();

    if(!formIsValid) {
      return;
    }
    
    console.log(enteredFirstName, ' ', enteredLastName, ' ', enteredEmail);
    resetFirstName();
    resetLastName();
    resetEmail();
  }

  const firstNameClasses = `${firstNameIsInvalid ? 'form-control invalid' : 'form-control'}`
  const lastNameClasses = `${lastNameIsInvalid ? 'form-control invalid' : 'form-control'}`
  const emailClasses = `${emailIsInvalid ? 'form-control invalid' : 'form-control'}`

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='fname'>First Name</label>
          <input
            type='text'
            id='fname'
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            />
            {firstNameIsInvalid && <p className="error-text">First name must not be empty.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='lname'>Last Name</label>
          <input
            type='text'
            id='lname'
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            />
            {lastNameIsInvalid && <p className="error-text">Last name must not be empty.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
            type='text'
            id='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            />
            {emailIsInvalid && <p className="error-text">Please enter a valid email.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
