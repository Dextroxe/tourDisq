import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://datawala.vercel.app/api",
});

export const getAllproperties = async () => {
  try {
    const res = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast.error("Something went wrong while fetching the properties");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const res = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }
    return res.data;
  } catch (error) {
    toast.error("Something went wrong while fetching the property");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      "/user/register",
      { email: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, while creating your account");
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, while booking your visit");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, while removing your booking");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getAllFav = async (email, token) => {
  if(!token) return 
  try{

    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      return res.data["favResidenciesID"];
    // return res.data["favResidenciesID"]

  }catch(error)
  {
    toast.error("Something went wrong while fetching favs");
    throw error
  }
};


export const getAllBookings = async (email, token) => {
  if(!token) return 
  try{

    const res = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("res",res);
      return res.data["bookedVisits"];
    // return res.data["favResidenciesID"]

  }catch(error)
  {
    toast.error("Something went wrong while Boking");
    throw error
  }
};

export const createResidency = async (data, token) => {
  console.log(data)
  try{
    const res = await api.post(
      "/residency/create",
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }catch(error)
  {
    throw error
  }
}