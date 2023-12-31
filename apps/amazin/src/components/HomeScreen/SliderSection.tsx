import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import { Suspense } from 'src/components/CustomSuspense';
import { DUMMY_SELLERS, SWIPER_CONFIG } from 'src/constants';
import SwiperCore, { Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar } from 'swiper';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import SellerSlide from './SellerSlide';

SwiperCore.use([Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination]);

const SwiperFallBack = <div className="swiper-container" />;

function SliderSection({ users: sellers, loading, error }: UserListType) {
  return (
    <Suspense fallback={SwiperFallBack}>
      <Swiper {...SWIPER_CONFIG} effect="coverflow" slidesPerView="auto">
        {(sellers || DUMMY_SELLERS).map((user) => (
          <SwiperSlide key={user._id}>
            <SellerSlide user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
      <MessageBox show={sellers?.length < 1}>No Seller Found</MessageBox>
      <LoadingOrError statusOf={{ loading, error }} />
    </Suspense>
  );
}

export default memo(SliderSection);
