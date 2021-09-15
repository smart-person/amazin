type ReqLogin = {
  username: string;
  password: string;
};

type ResLoginApi = Res & {
  data: {
    access_token: string;
  };
};

type ResLogin = ActionRedux | {};

type SellerType = {
  _id?: string;
  name: string;
  logo?: string;
  description?: string;
  rating?: number;
  numReviews?: number;
};

type UserType = {
  _id?: string;
  name: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  isSeller?: boolean;
  failLoginCount?: number;
  currency?: string;
  seller?: SellerType;
  verify?: boolean;
};

type UserInfoType = UserType & {
  token: string;
};

type UserDetailType = StatusType & {
  user: UserType;
};

type ContactType = {
  name?: string;
  email?: string;
  subject?: string;
  text?: string;
};
