import axios from "axios";
export const roughUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "roughReducerRequest",
    });

    const { data } = await axios.get("/api");

    dispatch({
      type: "roughReducerSusscess",
      payload: data
    });

  } catch (error) {
    dispatch({
      type: "roughReducerFailure",
      payload: error,
    });
  }
};