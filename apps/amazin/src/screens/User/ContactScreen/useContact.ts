import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { validateRules } from 'src/constants';
import { sendContactMessage, updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { useShadow } from 'src/hooks/useShadow';

const validate = ({ name, email, text }: ContactType) => {
  let error = '';

  const checkField = (type: RuleName, value = '') => {
    const rules = validateRules[type];
    const hasError = rules.some(([_, rule]) => !new RegExp(rule).test(value));
    if (hasError) error = ' Something wrong happened!';
  };

  checkField('name', name);
  checkField('email', email);
  checkField('message', text);

  return error;
};

export function useSubmitContact(setStatus: SetState) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  async function submitContact(e: EventType, contactInfo: ContactType) {
    e.preventDefault();

    const error = validate(contactInfo);
    if (error.length) return setStatus({ error });
    const contact = contactInfo as UserType;

    if ('Seller' === contactInfo.subject)
      return dispatch(updateUserProfile({ _id: userInfo._id, name: contact.name, email: contact.email, verify: true }));

    dispatch(sendContactMessage(contactInfo, setStatus));
  }

  return { submitContact };
}

export function useContact(setName: SetState, setEmail: SetState, setSubject: SetState, setStatus: SetState) {
  const dispatch = useDispatch();
  const { subject: pSubject }: { subject: string } = useParams();
  const { userInfo } = useShadow();
  const userUpdateProfile: StatusType = useSelector((state: AppState) => state.userUpdateProfile);

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setSubject(pSubject);
  }, [userInfo, pSubject, setName, setEmail, setSubject]);

  useEffect(() => {
    setSubject(pSubject);
    if ('Seller' !== pSubject || !userUpdateProfile.success) return;
    dispatch(userUpdateProfileActions._RESET(''));
    setStatus({ msg: 'Seller Account verified successfully!' });
  }, [dispatch, pSubject, userUpdateProfile.success, setSubject, setStatus]);
}
