import { toast } from 'react-toastify';
const BASE_URL = require('../apiconfig').BASE_URL;

export const createDoctor = (formData, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/adddoctor`, {
        method: 'POST',
        headers: {
          "Contetnt-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add Doctor');
      }
      const data = await response.json();
      if (data.success) {
        toast.success("Doctor added successfully!");
      }
      if (data.message) {
        toast.error(data.message);
        // alert(data.message);
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const alldoctor = (page, search, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/alldoctor?page=${page}&search=${search}`, {
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