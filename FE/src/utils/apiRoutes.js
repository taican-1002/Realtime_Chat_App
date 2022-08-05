export const registerRoute =
  process.env.REACT_APP_API_URL + "/api/auth/register";
export const loginRoute = process.env.REACT_APP_API_URL + "/api/auth/login";
export const setAvatarRoute =
  process.env.REACT_APP_API_URL + "/api/auth/setAvatar";
export const allUsersRoute =
  process.env.REACT_APP_API_URL + "/api/auth/allusers";
export const logoutRoute = process.env.REACT_APP_API_URL + "/api/auth/logout";

export const sendMessageRoute =
  process.env.REACT_APP_API_URL + "/api/messages/addmsg";
export const getAllMessagesRoute =
  process.env.REACT_APP_API_URL + "/api/messages/getmsg";
