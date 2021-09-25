import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrencyRates } from 'src/apis/productAPI';
import { signin, updateUserProfile } from 'src/apis/userAPI';
import { pipe, validateAll } from 'src/utils';

export function useSignin(location: LocationProp, history: HistoryProp) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userSignin = useSelector((state: AppState) => state.userSignin);
  const { userInfo }: { userInfo: UserType } = userSignin;
  const [status, setStatus] = useState<StatusType>();

  useEffect(() => {
    if (!userInfo) return;

    dispatch(updateCurrencyRates());

    pipe.setCurrency(userInfo.currency ?? pipe.setCurrency);
    const { _id, name, email } = userInfo;
    if (!userInfo.currency) dispatch(updateUserProfile({ _id, name, email, currency: pipe.currency }));

    history.push(redirect);
  }, [dispatch, history, redirect, userInfo]);

  const submitSignin = (e: EventType, { email, password }: Record<string, string>) => {
    e.preventDefault();
    const error = validateAll({ email, password });
    if (error) setStatus({ error });
    else dispatch(signin(email, password));
  };

  return { redirect, status, userSignin, submitSignin };
}
