import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useSellerProfile, useUserProfile } from './useProfile';
import Form from 'src/layouts/Form';
import PasswordSection from './PasswordSection';
import SellerProfileSection from './SellerProfileSection';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import SuccessModal from 'src/components/SuccessModal';

export default function ProfileScreen({ location }: RouteProps<MatchParams>) {
  const userUpdateProfile: StatusType = useSelector((state: AppState) => state.userUpdateProfile);

  const [passwords, setPasswords] = useState(['', undefined]);
  const { seller, setSeller, userDetails, submitUpdate } = useSellerProfile(location);
  const { name, setName, email, setEmail } = useUserProfile(location, userDetails?.user, setPasswords);

  const handleSubmit = (e: EventType) => submitUpdate(e, name, email, passwords);

  if (userDetails?.user && userUpdateProfile.success)
    return <SuccessModal className="form" msg="Profile Updated Successfully" label="Back To Home Page" />;

  return (
    <Form header="User Profile" statusOf={userDetails} onSubmit={handleSubmit} btn="Update">
      <LoadingOrError xl statusOf={userUpdateProfile} />

      {!!userDetails?.user && (
        <>
          <CustomInput text="Name" hook={[name, setName]} />
          <CustomInput text="Email" type="email" hook={[email, setEmail]} />
          <PasswordSection hook={[passwords, setPasswords]} />
        </>
      )}

      {seller && <SellerProfileSection userDetails={userDetails} seller={seller} setSeller={setSeller} />}
    </Form>
  );
}
