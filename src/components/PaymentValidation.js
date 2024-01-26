import React, { useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  const initialFormData = {
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const validateCardNumber = (value) => {
    const cardNumberRegex = /^[0-9]{16}$/;
    return cardNumberRegex.test(value) ? "" : "Invalid Card Number";
  };

  const validateCardName = (value) => {
    const cardNameRegex = /^[a-zA-Z ]+$/;
    return cardNameRegex.test(value) ? "" : "Invalid Card Name";
  };

  const validateCvv = (value) => {
    const cvvRegex = /^[0-9]{3}$/;
    return cvvRegex.test(value) ? "" : "Invalid CVV";
  };

  const validateExpiryMonth = (value) => {
    const expiryMonthRegex = /^(0[1-9]|1[0-2])$/;
    const currentMonth = new Date().getMonth() + 1;
    const enteredMonth = parseInt(value, 10);

    return expiryMonthRegex.test(value) && enteredMonth >= currentMonth
      ? ""
      : "Invalid Month";
  };

  const validateExpiryYear = (value) => {
    const expiryYearRegex = /^\d{4}$/;
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(value, 10);

    return expiryYearRegex.test(value) && enteredYear >= currentYear
      ? ""
      : "Invalid Year";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    switch (name) {
      case "cardNumber":
        setFormErrors({ ...formErrors, cardNumber: validateCardNumber(value) });
        break;
      case "cardName":
        setFormErrors({ ...formErrors, cardName: validateCardName(value) });
        break;
      case "expiryMonth":
        setFormErrors({
          ...formErrors,
          expiryMonth: validateExpiryMonth(value),
        });
        break;
      case "expiryYear":
        setFormErrors({ ...formErrors, expiryYear: validateExpiryYear(value) });
        break;
      case "cvv":
        setFormErrors({ ...formErrors, cvv: validateCvv(value) });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    setFormData(initialFormData);
  };

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">
              {formData.cardNumber || "XXXXXXXXXXXXXXXX"}
            </p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">
                {formData.cardName || "HOLDER NAME"}
              </span>
              <span className="debit-card-date">
                {formData.expiryMonth || "MM"}/{formData.expiryYear || "YYYY"}
              </span>
              <span className="debit-card-cvv">{formData.cvv || "CVV"}</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={handleSubmit}>
              <div className="layout-column mb-15">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                <p className="invalid-text" data-testid="numberInputError">
                  {formErrors.cardNumber}
                </p>
              </div>
              <div className="layout-column mb-15">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  value={formData.cardName}
                  onChange={handleChange}
                />
                <p className="invalid-text" data-testid="nameInputError">
                  {formErrors.cardName}
                </p>
              </div>
              <div className="flex justify-content-around debit-card-list">
                <div className="layout-column mb-30 list-card">
                  <input
                    type="text"
                    name="expiryMonth"
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                  />
                  <p className="invalid-text" data-testid="monthInputError">
                    {formErrors.expiryMonth}
                  </p>
                </div>
                <div className="layout-column mb-30 list-card">
                  <input
                    type="text"
                    name="expiryYear"
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    value={formData.expiryYear}
                    onChange={handleChange}
                  />
                  <p className="invalid-text" data-testid="yearInputError">
                    {formErrors.expiryYear}
                  </p>
                </div>
                <div className="layout-column mb-30 list-card">
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    data-testid="cvvInput"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                  <p className="invalid-text" data-testid="cvvInputError">
                    {formErrors.cvv}
                  </p>
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={
                    formErrors.cardNumber ||
                    formErrors.cardName ||
                    formErrors.expiryMonth ||
                    formErrors.expiryYear ||
                    formErrors.cvv
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
