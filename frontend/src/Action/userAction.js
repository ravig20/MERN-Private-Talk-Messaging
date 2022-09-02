import axios from "axios";
import io  from "socket.io-client";
var socket = io();
export const sendEmail = (email, phone) => async (dispatch) => {
  try {
    dispatch({
      type: "emailOtpRequest",
    });
    const { data } = await axios.post(
      "/api/v1/sendemail",
      { email: email, phone: phone },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    dispatch({
      type: "emailOtpSusscess",
      payload: data
    });
  } catch (error) {

    dispatch({
      type: "emailOtpFailure",
      payload: error.response.data
    });
  }
}


export const userRegisterRequest = (pic, name, phone, email, password, otp) => async (dispatch) => {

  try {
    dispatch({
      type: "RegisterRequest",
    });


    let { data } = await axios.post(
      "/api/v1/register",
      {
        pic: pic,
        name: name,
        phone: phone,
        email: email,
        password: password,
        otp: otp
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );


    dispatch({
      type: "RegisterSuccess",
      payload: data
    });
    dispatch({
      type: "medataSusscess",
      payload: data
    });
    
  } catch (error) {

    dispatch({
      type: "RegisterFailure",
      payload: error.response.data
    });
  }
}


export const fromAction = (pic, name, email, phone, password) => async (dispatch) => {


  const data = {
    pic, name, email, phone, password
  };
  dispatch({
    type: "fromReducers",
    payload: data
  });
}


export const loginAction = (email = "", phone = "", password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/v1/login",
      { email: email, phone: phone, password: password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "LoginSuccess",
      payload: data
    });
    dispatch({
      type: "medataSusscess",
      payload: data
    });

  } catch (error) {

    dispatch({
      type: "LoginFailure",
      payload: error.response.data
    });
  }
};


export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest"
    });
    await axios.get("/api/v1/logout");
    dispatch({
      type: "logoutSuccess",
    });
    dispatch({
      type: "cleardataReducer",
    });
    dispatch({
      type: "clearFatchUser",
    });
    dispatch({
      type: "clearsearchUserData",
    });
    dispatch({
      type: "clearSelectedChatReducer",
    });

  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.message,
    });
  }


}


export const searchUserAction = (word = " ") => async (dispatch) => {
  try {
    dispatch({
      type: "searchUserRequest"
    });
    const { data } = await axios.get(`/api/v1/search?search=${word}`);
    dispatch({
      type: "searchUserSuccess",
      payload: data,

    });

  } catch (error) {
    dispatch({
      type: "searchUserFailure",
      payload: error.message,
    });
  }

};



export const creatingChatAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "creatingChatRequest"
    });
    const { data } = await axios.post(
      "/api/v1/chat",
      { userId: id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "creatingChatSuccess",
      payload: data,

    });

  } catch (error) {
    dispatch({
      type: "creatingChatFailure",
      payload: error.message,
    });
  }

};



export const FatchUserChatAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "FatchUserRequest"
    });
    const { data } = await axios.get(
      "/api/v1/chat"
    );
    dispatch({
      type: "FatchUserSuccess",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "FatchUserFailure",
      payload: error.message,
    });
  }

};


export const meDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "medataRequest"
    });
    const { data } = await axios.get("/api/v1/me");
    dispatch({
      type: "medataSusscess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "medataFailure",
      payload: error.message,
    });
  }


}

export const creatGroupAccountAction = (groupAvatar,groupName,userArray) => async(dispatch) =>{
  try {
    dispatch({
      type: "creatingGroupChatRequest"
    });
    const user = JSON.stringify(userArray); 

    const { data } = await axios.post(
      "/api/v1/chat/group",
      { groupName: groupName, groupPic: groupAvatar, users: user },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(data);

    dispatch({
      type: "creatingGroupChatSuccess",
      payload: data,
    });

  } catch (error) {
      dispatch({
      type: "creatingGroupChatFailure",
      payload: error.response.data,
    });
  }

}


export const updateProfileAction = (updateName, updateAvatar,chatID) => async (dispatch) => {
  try {
    dispatch({
      type: "updateGroupProfleRequest",
    });

    const { data } = await axios.put(
      "/api/v1/chat/group/update",
      {  chatID, updateName, updateAvatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "updateGroupProfleSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateGroupProfleFailure",
      payload: error,
    });
  }
};



export const addingUserToGroupAction = (userId,chatId) => async (dispatch) => {
  try {
    dispatch({
      type: "addingUserToGroupRequest",
    });

    const { data } = await axios.put(
      "/api/v1/chat/adding/group",
      {  userId,chatId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "addingUserToGroupSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "addingUserToGroupFailure",
      payload: error,
    });
  }
};



export const removingUserToGroupAction = (userId,chatId) => async (dispatch) => {
  try {
    dispatch({
      type: "removingUserToGroupRequest",
    });

    const { data } = await axios.put(
      "/api/v1/chat/removing/group",
      {  userId,chatId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "removingUserToGroupSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "removingUserToGroupFailure",
      payload: error,
    });
  }
};


export const deleteGroupAction = (groupId) => async (dispatch) => {
  try {

    dispatch({
      type: "deleteGroupRequest",
    });

    const { data } = await axios.delete(
      `/api/v1/chat/delete/group/${groupId}`

    );
    dispatch({
      type: "deleteGroupSuccess",
      payload: data,
    });
  } catch (error) {

    dispatch({
      type: "deleteGroupFailure",
      payload: error,
    });
  }
};


export const leaveGroupAction = (chatId) => async (dispatch) => {
  try {
    dispatch({
      type: "leaveGroupRequest",
    });

    const { data } = await axios.delete(
      "/api/v1/chat/delete/group",
      { chatId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "leaveGroupSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "leaveGroupFailure",
      payload: error,
    });
  }
};

  

export const FatchUserMessageAction = (chatId) => async (dispatch) => {
  try {
    dispatch({
      type: "FatchMessageRequest"
    });
    const { data } = await axios.get(
     `/api/v1/message/${chatId}`
    );

    dispatch({
      type: "FatchMessageSuccess",
      payload: data,
    });
    socket?.emit("join chat",chatId);
  } catch (error) {
    dispatch({
      type: "FatchMessageFailure",
      payload: error.message,
    });
  }
};

  

export const SendUserMessageAction = (content,chatId) => async (dispatch) => {
  try {
    dispatch({
      type: "sendMessageRequest"
    });
    const { data } = await axios.post(
      "/api/v1/message",
      { content,chatId},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    socket.emit("new message", data)
    dispatch({
      type: "sendMessageSuccess",
      payload: data,
    });
   

  } catch (error) {
    dispatch({
      type: "sendMessageFailure",
      payload: error.message,
    });
  }


};



export const updateUserProfileAction = (updateName, updateAvatar , updatePhone, updateCaption) => async (dispatch) => {
  try {

    dispatch({
      type: "sendUpdateUserProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/updateProfile",
      {  updateName, updateAvatar , updatePhone, updateCaption },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "sendUpdateUserProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "sendUpdateUserProfileFailure",
      payload: error.response.data,
    });
  }
};



export const updateUserPassword= ( oldPasswords, newPasswords, confirmPassword) => async (dispatch) => {
  try {
    
    dispatch({
      type: "sendUpdateUserProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/updatePassword",
      {   oldPasswords, newPasswords, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "sendUpdateUserProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "sendUpdateUserProfileFailure",
      payload: error.response.data,
    });
  }
};


export const creatStar= (email,isTrue) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      "/api/v1/createStar",
      {  email,isTrue },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "sendUpdateUserProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "sendUpdateUserProfileFailure",
      payload:  error.response.data,
    });
  }
};
// email verifction
export const ForgetPassword = (email,newPasswords,confirmPassword,otp) => async (dispatch) => {
  try {

    dispatch({
      type: "sendForgetPasswordRequest",
    });

    const { data } = await axios.put(
      "/api/v1/forgetPassword",
      { email,newPasswords,confirmPassword,otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "sendForgetPasswordSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "sendForgetPasswordFailure",
      payload: error.response.data,
    });
  }
};

export const sendMailForForgotPassword= (email) => async (dispatch) => {
  try {

    dispatch({
      type: "sendForgetPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/sendotpmail",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "sendForgetPasswordSuccess",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "sendForgetPasswordFailure",
      payload: error.response.data,
    });
  }
};


export const RemoveUserAction = (chatId) => async (dispatch) => {
  try {

    dispatch({
      type: "sendUpdateUserProfileRequest",
    });

    const { data } = await axios.delete(
      `/api/v1/chat/delete/chat/${chatId}`

    );
    dispatch({
      type: "sendUpdateUserProfileSuccess",
      payload: data,
    });
  } catch (error) {

    dispatch({
      type: "sendUpdateUserProfileFailure",
      payload: error,
    });
  }
};