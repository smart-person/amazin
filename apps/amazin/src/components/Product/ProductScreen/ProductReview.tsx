import { memo } from 'react';
import { Link } from 'react-router-dom';

import { ReviewProps } from 'src/screens/Product/ProductScreen/useProductReview';
import { RATING_OPTS, REVIEWS_PER_PAGE } from 'src/constants';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import CustomSelect from 'src/components/CustomSelect';
import MessageBox from 'src/components/MessageBox';
import ReviewCard from 'src/components/ReviewCard';

type Props = ReviewProps & {
  product: ProductType;
};

function ProductReview({ product, userInfo, reviewStatus, rating, onRating, comment, onComment, submitReview }: Props) {
  return (
    <div className="p-1">
      <h2 id="reviews">Reviews</h2>
      <MessageBox show={product.reviews?.length === 0}>There is no review</MessageBox>
      {/* TODO pagination for review section */}
      <ul>
        {product.reviews?.slice(0, REVIEWS_PER_PAGE).map((review, id) => (
          <ReviewCard key={id} review={review} />
        ))}
      </ul>
      <MessageBox show={!userInfo}>
        Please <Link to="/signin">Sign In</Link> to write a review
      </MessageBox>
      {!!userInfo && (
        <Form header="Write a customer review" statusOf={reviewStatus} onSubmit={submitReview} btn="Submit">
          <CustomSelect label="Rating" list={RATING_OPTS} value={rating} onChange={onRating} />

          <CustomInput textarea text="Comment" rows={5} value={comment} onChange={onComment} />
        </Form>
      )}
    </div>
  );
}

export default memo(ProductReview);
