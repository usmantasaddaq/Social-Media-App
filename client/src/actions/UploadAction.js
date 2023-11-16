import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start ho gya hy")
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = (data) => async (dispatch) => {
  try {
    console.log("File upload Action start ho gya hy")
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};


export const uploadImagequestion = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start ho gya hy")
    await UploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPostquestion = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
    return data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};

export const closePost = (id) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost =await UploadApi.closePost(id);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};