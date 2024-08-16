'use client'
import React, { useState } from "react";

export const Register = () => {
  const [data, setData] = useState({});

  const fnRegister = async () => {
    try {
      var dataobj = { "data": data };
      const res = await fetch('http://localhost:2023/marks/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataobj)
      });
      const result = await res.json();
      console.log(result);
    } catch (ex) {
      console.error(ex);
    }
  };

  const fnChange = (eve) => {
    const { id, value } = eve.target;
    setData({ ...data, [id]: value });
  };

  return (
    <div>
      <h3>Register</h3>
      <p><b>Name:</b> <input id="name" onChange={fnChange} /></p>
      <p><b>Marks:</b> <input id="marks" onChange={fnChange} type="number" /></p>
      <p><button onClick={fnRegister}>Register</button></p>
    </div>
  );
}
