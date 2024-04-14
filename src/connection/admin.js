import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = require('../apiconfig').BASE_URL;

export const createDoctor = (userData, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/adddoctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to add Doctor');
      }
      const data = await response.json();
      if (data.message) {
        toast.success("Doctor added successfully!");
      }
      if (data.error) {
        alert(data.error);
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const alldoctor = (page, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/alldoctor?page=${page}`, {
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
      return data
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const blockdoctor = (doctorid, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/blockdoctor/${doctorid}`, {
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
      if (data.success) {
        toast.success("Doctor Blocked Successfully");
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const unblockdoctor = (doctorid, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/unblockdoctor/${doctorid}`, {
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
      if (data.success) {
        toast.success("Doctor UnBlocked Successfully");
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const deletedoctor = (doctorid, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/deletedoctor/${doctorid}`, {
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
      if (data.success) {
        toast.success('Successfully Deleted');
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};