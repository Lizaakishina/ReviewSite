import "./Fieldset.css";

const Fieldset = ({input, inputClass, placeholder, name, minLength, maxLength, onChange, errors, isValid, pattern}) => {
  
  return (
    <fieldset className="form__fieldset">
      <legend className="form__legend">{placeholder}</legend>
      <input
        type={input}
        name={name}
        className={`form__input_type_${inputClass} form__input  ${errors[name] && 'form__input_type_error'}`}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        required
      />
      <span className={`form__input-error ${!isValid && 'form__input-error_active'}`}>{errors[name]}</span>
    </fieldset>
  )
}

export default Fieldset;