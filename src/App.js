import React, { useState } from "react";
import './App.css';

const App = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isEmail = () => {
    let mail = document.getElementById('not-mail');
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if ((email).match(regex)) {
      mail.style.display = 'none';
      return true;
    } else {
      mail.style.display = "block";
      return false;
    }
  }

  const failMessage = (message) => {
    let formMess = document.querySelector('.form-message');
    formMess.innerHTML = 'Please fill in the filed necessary, marked with an asterisk (*)';
    formMess.style.opacity = '1';

    document.getElementById('name').classList.add('error');
    document.getElementById('email').classList.add('error');
    document.getElementById('message').classList.add('error');
  }

  const successMessage = () =>  {
    let formMess = document.querySelector('.form-message');
    formMess.innerHTML = 'Message sent';
    formMess.style.opacity = '1';
    document.getElementById('name').classList.remove('error');
    document.getElementById('email').classList.remove('error');
    document.getElementById('message').classList.remove('error');

    setTimeout(()=>{
      formMess.style.opacity = "0";
    },3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && isEmail() && message) {
      sendFeedback("template_vj1ssqi", {
        name:name, //name
        company:company,
        phone:phone,
        email:email,
        message:message,
      });
    } else {
      //alert('Please fill in the filed necessary, marked with an asterisk (*)');
      failMessage('Please fill in the filed necessary, marked with an asterisk (*)');
    }
  };


  const sendFeedback = (templateId, variables) => {

    window.emailjs
      .send("service_6st04xf", templateId, variables)
      .then((res) => {
        successMessage();
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setMessage("");
      })
      .catch(
        (err) => {
          failMessage('An error has occurred. Please try again.');
        })
     
  };

  return (
    <form className="contact-form">
      <h2>Contact us</h2>
      <div className="form-content">
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name*"
          value={name}
          autoComplete="off"
        />
        <input
          type="text"
          id="company"
          name="company"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          value={company}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile"
          value={phone}
        />
        <div className="email-content">
          <label id="not-mail">Invalid Email</label>
          <input
            type="mail"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail*"
            value={email}
            autoComplete="off"
          />
        </div>
        <textarea
          id="message"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message*"
          value={message}
        />
      </div>
      <input
        className="button"
        type="button"
        value="Envoyer"
        onClick={handleSubmit}
      />
      <div className="form-message"></div>
    </form>
  );
};

export default App;
