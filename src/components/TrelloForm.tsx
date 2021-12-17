import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formInputs, ITrelloFormData } from "../utils/config";
import checkImg from "../assets/images/check.png";
import formLoadingImg from "../assets/images/movie-loading.gif";

/* 
TRELLO FORM USES AN EXTERNAL PACKAGE REACT-HOOK-FORM FOR FORM HANDLING & VALIDATION.
IT RENDERS THE REQUIRED FORM
AND POSTS THE FORM DATA THROUGH TO TRELLO THEIR API.
THE FORM INPUTS ARE DEFINED AT ../utils/config.js
*/

interface TrelloFormProps {
  movieTitle: string;
}

const TrelloForm: React.FC<TrelloFormProps> = ({ movieTitle }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const allFalseFormState = {
    loading: false,
    waiting: false,
    done: false,
    error: false,
  };

  const [formState, setFormState] = useState({
    ...allFalseFormState,
    waiting: true,
  });

  /* Changes the form state between loading then either done or failed.
  And creates form data from form field and sends the relevant data to Trello API.
  */
  const formHandler = async (
    data: ITrelloFormData,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    setFormState({ ...allFalseFormState, loading: true });

    const formData = new FormData();
    formData.append("name", `Thulane Khumalo`);
    formData.append(
      "desc",
      `First name: ${data.firstName}
      Surname: ${data.surname}
      Email: ${data.email}
      Phone Number: ${data.phoneNumber}
      Movie: ${movieTitle}
    `
    );
    formData.append("idList", `5a4b3c4cbe0188ca9c0b2059`);
    formData.append("pos", "1");
    formData.append("urlSource", "thulane.co.za");

    let response = await fetch(
      `https://api.trello.com/1/cards?key=6eb508bda626ff893db446eff50d0066&token=ae4a73cb0e40c46f6e642f5f7429394534b35e3b5a4c7c21438e5389eec20497`,
      {
        method: "POST",
        body: formData,
      }
    ).catch((err) => err);

    if (e && response.status === 200) {
      setFormState({ ...allFalseFormState, done: true });
      e.target.reset();
    } else {
      setFormState({ ...allFalseFormState, error: true });
    }
  };

  const inputStyles = (name: string): React.CSSProperties =>
    errors[name] ? { borderBottomColor: "#ff1111" } : {};

  return (
    <div className="trello-form-container">
      {formState.done ? (
        <div className="trello-form-submitted-container">
          <h1 className="trello-form-submitted-text">FORM SUBMITTED</h1>
          <img
            src={checkImg}
            alt="green check"
            className="trello-form-submitted-img"
          />
        </div>
      ) : formState.loading ? (
        <div className="trello-form-loading-container">
          <h3 className="trello-form-loading-text">Submitting Form</h3>
          <img
            src={formLoadingImg}
            alt="loading icon"
            className="trello-form-loading-img"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit(formHandler)} className="trello-form">
          <h2 className="trello-form-heading">Trello Form</h2>
          {formState.error && (
            <p className="trello-form-error-msg">
              An error occurred when submitting the form. Please try again.
            </p>
          )}
          {formInputs.map(({ label, name, type, validationOptions }) => (
            <div key={name} className="trello-form-input-container">
              {/* <label className="trello-form-label">
                {name}
              </label> */}
              <input
                style={inputStyles(name)}
                {...register(name, validationOptions)}
                type={type}
                placeholder={label}
                className="trello-form-input"
              />
              {errors[name] && (
                <h4 className="trello-form-input-error-message">
                  {errors[name].message}
                </h4>
              )}
            </div>
          ))}

          <button type="submit" className="trello-form-submit-btn">
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default TrelloForm;
