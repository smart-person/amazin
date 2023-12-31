import { useSelector } from 'react-redux';

import { useShadow } from 'src/hooks/useShadow';
import LoadingOrError from 'src/components/LoadingOrError';
import Button from 'src/components/Button';

export default function AdminDeliveryCard({ deliverHandler }: { deliverHandler: FnType }) {
  const { userInfo } = useShadow();
  const { order }: OrderDetailType = useSelector((state: AppState) => state.orderDetails);
  const orderDeliver: StatusType = useSelector((state: AppState) => state.orderDeliver);

  const isTestSeller = userInfo?.isSeller && 'development' === process.env.REACT_APP_ENVIRONMENT;

  if (!order?.isDelivered && ((userInfo?.isAdmin && order?.isPaid) || isTestSeller))
    return (
      <li className="card card__body">
        <div className="min-20">
          <LoadingOrError statusOf={orderDeliver} />

          <Button primary fill onClick={deliverHandler} label="Deliver Order" />
        </div>
      </li>
    );

  return null;
}
