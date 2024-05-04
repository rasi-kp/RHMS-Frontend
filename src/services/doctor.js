import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = require('../apiconfig').BASE_URL;

export const dashboard=(token)=>{
  return async(dispatch)=>{
    try {
      const response = await axios.get(`${BASE_URL}/doctor/dashboard`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });
      return response.data
  } catch (error) {
      console.log('Error fetching dashboard:', error);
  }
  }
}
export const getuserid=(patientid,token)=>{
  return async(dispatch)=>{
      const response = await axios.get(`${BASE_URL}/doctor/getuserid/${patientid}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });
      return response.data
  }
}
export const allpatient=(page,search,token)=>{
  return async(dispatch)=>{
    try {
      const response = await axios.get(`${BASE_URL}/doctor/allpatient?page=${page}&search=${search}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });
      return response.data
  } catch (error) {
      console.log('Error fetching dashboard:', error);
  }
  }
}
export const allappointments = (page,date,search,token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/appointment?page=${page}&search=${search}&date=${date}`, {
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
      return data
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};

export const completedappoinment = (page,search,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/cappointment?page${page}&search=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch appointement');
      }
      const data = await response.json();
      return data
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
}
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
export const addprescriptions = (formData, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/addprescription`, {
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
        return toast.success("Prescription added successfully");
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
export const accept = (appointmentid,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/accept/${appointmentid}`, {
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
export const pending = (appointmentid,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/absent/${appointmentid}`, {
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
      if(data.message){
        toast.success("Appointment is now Pending")
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};