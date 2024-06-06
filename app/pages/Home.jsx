// pages/index.js
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Home = () => {
  const [emails, setEmails] = useState([]);
  const [openaiKey, setOpenaiKey] = useState("");

  const responseGoogle = async (response) => {
    if (response.credential) {
      try {
        const res = await axios.post("http://localhost:5000/authenticate", {
          token: response.credential,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        fetchEmails(res.data.access_token);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchEmails = async (token) => {
    try {
      const res = await axios.post("http://localhost:5000/fetch-emails", {
        token,
        count: 10,
      });
      localStorage.setItem("emails", JSON.stringify(res.data));
      setEmails(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const classifyEmails = async () => {
    const emails = JSON.parse(localStorage.getItem("emails"));
    try {
      const res = await axios.post("http://localhost:5000/classify-emails", {
        openaiKey,
        emails,
      });
      setEmails(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h1>Gmail Classifier</h1>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => {
            console.error("Login Failed");
          }}
        />
        <div>
          <input
            type="text"
            placeholder="OpenAI API Key"
            value={openaiKey}
            onChange={(e) => setOpenaiKey(e.target.value)}
          />
          <button onClick={classifyEmails}>Classify Emails</button>
        </div>
        <div>
          {emails.map((email, index) => (
            <div key={index}>
              <h3>{email.snippet}</h3>
              <p>{email.classification}</p>
            </div>
          ))}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Home;
