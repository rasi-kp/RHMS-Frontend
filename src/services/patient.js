import { toast } from 'react-toastify';
const BASE_URL = require('../apiconfig').BASE_URL;

export const allpatient = (page,search,token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/patient/all?page=${page}&search=${search}`, {
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
      if (data.success) {
        toast.success('Successfully Deleted');
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
};
export const allappointments = (page,search,token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/patient/appointments?page=${page}&search=${search}`, {
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
export const deleteappointment1 = (id,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/patient/deleteappointment/${id}`, {
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
      if (data.message) {
        return toast.success("Appointment Cancelled Successfully !");
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
}
export const completedappoinment = (page,search,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/patient/completeappointment?page${page}&search=${search}`, {
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
export const alldoctorselection = () => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/doctors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
export const alldoctor = (page,search,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/patient/alldoctor?page=${page}&search=${search}`, {
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
export const addappoinment = (result,token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/patient/addappointment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(result),
      });
      if (!response.ok) {
        throw new Error('Failed to add Doctor');
      }
      const data = await response.json();
      if (data.message) {
        return toast.success("Appintment Added Successfully !");
      }
    } catch (error) {
      toast.error(error.message)
      alert(error.message);
    }
  };
}


export const viewtoken = (date,doctorid, token) => {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/patient/alltokens?date=${date}&doctorid=${doctorid}`, {
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

