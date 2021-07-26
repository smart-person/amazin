import React from 'react';
import { useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';

import LoadingBox from '../../../components/LoadingBox';
import LoadingOrError from '../../../components/LoadingOrError';

function PaypalCard({ sdkReady, successPaymentHandler }) {
  const { order } = useSelector((state) => state.orderDetails);
  const orderPay = useSelector((state) => state.orderPay);

  if (order?.isPaid) return null;
  return (
    <li className="card card__body">
      <div className="min-20">
        <h2>Payment Options</h2>

        {!sdkReady ? (
          <LoadingBox />
        ) : (
          <>
            <LoadingOrError statusOf={orderPay} />

            <PayPalButton
              amount={order?.totalPrice}
              onSuccess={successPaymentHandler}
            />
          </>
        )}
      </div>
    </li>
  );
}

export default PaypalCard;
