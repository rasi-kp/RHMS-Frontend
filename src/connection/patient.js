import { toast } from 'react-toastify';
const BASE_URL = require('../apiconfig').BASE_URL;

export const createUser = (userData,token) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${BASE_URL}/patient/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error('Failed to add new member');
        }
        const data = await response.json();
        if (data.message) {
          toast.success('Successfully Add New Member')
        }
      } catch (error) {
        toast.error(error.message)
        alert(error.message);
      }
    };
};
export const updateUser = (userData,token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/patient/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update member');
      }
      const data = await response.json();
      return data
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const deleteuser = (patientid,token) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${BASE_URL}/patient/delete/${patientid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to add new member');
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
export const edituser = (patientid,token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/patient/edit/${patientid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add new member');
      }
      const data = await response.json();
      return data.patient
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};

