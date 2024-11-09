import { UserLogin } from "../interfaces/UserLogin";
import axios from 'axios';

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route '/auth/login' with the userInfo

  // TODO: return the user object from the response

}

const register = async (userInfo: UserLogin) => {
  const res = await axios.post('/auth/register', userInfo);

  return res.data;
}

export const getUser = async () => {
  // TODO: Make a GET request to '/auth/user' to get the logged in user's data

  // TODO: return the user object from the response
}

export const logOut = async () => {
  // TODO: Make a GET request to '/auth/logout' to delete the user's cookie and log them out
}


export { login, register };
