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
  process.env.REACT_APP_API_URL + "/api/messages/getMsg";

export const uploadSingleFileRoute =
  process.env.REACT_APP_API_URL + "/api/files/singleFile";
// export const uploadMultipleFileRoute =
//   process.env.REACT_APP_API_URL + "/api/files/multipleFiles";

// export const getSingleFileRoute =
//   process.env.REACT_APP_API_URL + "/api/files/getSingleFiles";
// export const deleteSingleFileRoute =
//   process.env.REACT_APP_API_URL + "/api/files/deleteSingleFile";

export const downloadFileRoute =
  process.env.REACT_APP_API_URL + "/api/download/file";
export const deleteMessageRoute = process.env.REACT_APP_API_URL + "/api/delete";
