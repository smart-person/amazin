import axios, { Method } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { mode: 'cors' }
});

const getTokenHeader = (authorization: boolean, getState: FnType) =>
  !authorization
    ? undefined
    : {
        Authorization: `Bearer ${getState()?.userSignin?.userInfo?.token}`,
        mode: 'cors'
      };

const checkDBError = (data: unknown) => {
  // HTML response with Error?
  if (typeof data === 'string' && data.startsWith('<!')) throw new Error("Couldn't access Database Server!");
};

const getErrorMsg = (error?: ErrorType) => error?.response?.data?.message ?? error?.message;

const axiosRedux =
  (authorization: boolean) =>
  (
    [action, actionBySuccess = action, actionByFail = actionBySuccess]: SliceAction[],
    { successAction, successHandler, selector = (d) => d }: OptionFns = {}
  ) =>
  (method: Method | undefined = 'get', url = '', requestData?: unknown) =>
  async (dispatch: AppDispatch, getState: FnType) => {
    const headers = getTokenHeader(authorization, getState);
    url = process.env.REACT_APP_BACKEND_URL + url;

    dispatch(action._REQUEST());

    try {
      const { data } = await axios(url, { method, headers, data: requestData });

      checkDBError(data);
      dispatch(actionBySuccess._SUCCESS(selector(data)));
      if (successAction) dispatch(successAction(data));
      if (successHandler) successHandler(data);
    } catch (error) {
      dispatch(actionByFail._FAIL(getErrorMsg(error)));
    }
  };

const axiosPublic = axiosRedux(false);
const axiosPrivate = axiosRedux(true);

export default axiosClient;
export { axios, axiosPublic, axiosPrivate };
