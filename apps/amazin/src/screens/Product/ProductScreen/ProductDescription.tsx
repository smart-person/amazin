import { memo } from 'react';

import './productScreen.css';
import Rating from 'src/components/Rating';
import Header from 'src/layouts/Header';
import PriceTag from '../components/PriceTag';

type PropType = {
  product: ProductType;
};

function ProductDescription({ product: { name, rating, numReviews, deal, price, description } }: PropType) {
  return (
    <div className="col-1 mh-2">
      <Header label={name} />
      <ul>
        <li>
          <Rating rating={rating} numReviews={numReviews} />
        </li>

        <li>
          <PriceTag price={price} deal={deal} />
        </li>

        <li>
          <b>Description:</b>
          <p>{description}</p>
        </li>
      </ul>
    </div>
  );
}
export default memo(ProductDescription);
