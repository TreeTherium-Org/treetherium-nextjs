import { useReducer } from "react";
import axios from "./axios";

const REQUEST_START = "REQUEST_START";
const REQUEST_SUCCESS = "REQUEST_SUCCESS";
const REQUEST_FAIL = "REQUEST_FAIL";

function useMutation({ method = "POST", url, onSuccess, onError }) {
  const [state, dispatch] = useReducer(reducer, {
    success: false,
    data: null,
    loading: false,
    error: null,
    message: null,
  });

  function reducer(state, action) {
    switch (action.type) {
      case REQUEST_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case REQUEST_SUCCESS:
        return {
          ...state,
          success: true,
          loading: false,
          data: action.payload,
          message: action.message,
        };
      case REQUEST_FAIL:
        return {
          ...state,
          success: false,
          loading: false,
          error: action.payload,
          message: action.message,
        };
    }
  }

  async function mutate(params, opts) {
    const overrideUrl = opts?.overrides?.url;
    try {
      dispatch({ type: REQUEST_START });
      const resp = await axios().request({
        method: method,
        url: overrideUrl ? overrideUrl : url,
        ...(method === "GET" ? { params: params } : { data: params }),
      });
      dispatch({
        type: REQUEST_SUCCESS,
        payload: resp?.data,
        message: resp?.message,
      });

      if (typeof onSuccess === "function") {
        onSuccess(resp);
      }
      return { success: true, data: resp, message: resp?.message };
    } catch (error) {
      dispatch({
        type: REQUEST_FAIL,
        payload: error,
        message: error?.message,
      });
      if (typeof onError === "function") {
        onError({ error: error?.error, message: error?.message });
      }
      return { success: false, error: error };
    }
  }
  return [state, mutate];
}

export default useMutation;
