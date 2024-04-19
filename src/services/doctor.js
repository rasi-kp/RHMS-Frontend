import { toast } from 'react-toastify';
const BASE_URL = require('../apiconfig').BASE_URL;

export const addtokens = (formData, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/addtoken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add Doctor');
      }
      const data = await response.json();
      if (data.message) {
        return toast.success("Token added successfully!");
      }
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
}

export const viewtoken = (date, token) => {
  return async () => {
    try {
        console.log(date + " " + token);
      const response = await fetch(`${BASE_URL}/doctor/viewtokens/${date}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      const data = await response.json();
      return data.tokens
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};