import React from 'react';
import { useSelector } from 'react-redux';

import LoadingOrError from '../../../components/LoadingOrError';
import { NavCategoryAdapter } from '../components/MenuItem';
import { navMainTemplate } from './navMainTemplate';
import NavMainItem from './NavMainItem';
import OpenSidebarBtn from './OpenSidebarBtn';
import { useShadow } from '../../../utils/useShadow';

export function _HeaderNavMain() {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { setShadowOf } = useShadow();

  return (
    <div className="nav-main row">
      <div className="nav__left">
        <OpenSidebarBtn />
      </div>

      <div className="nav__fill">
        {[
          ...navMainTemplate,
          ...(productCategoryList?.categories
            ?.slice(0, 9)
            .map(NavCategoryAdapter) || [])
        ].map(([label, to], id) => (
          <NavMainItem
            label={label}
            to={to}
            key={id}
            clearShadow={setShadowOf}
          />
        ))}

        <LoadingOrError statusOf={productCategoryList} />
      </div>

      <div className="nav__right">
        <NavMainItem to="/contact/subject/Ads" clearShadow={setShadowOf}>
          <sup>Your Ads</sup> here on this place? Contact us
        </NavMainItem>
      </div>
    </div>
  );
}

const HeaderNavMain = React.memo(_HeaderNavMain);
export default HeaderNavMain;
