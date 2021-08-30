import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest } from 'src/utils';
import { SHADOW } from 'src/constants';

export function useSuggestBox(setSuggests) {
  const { productList } = useSelector((state) => state.productListAll);

  const { suggestBox, setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  const showSuggestBox = useCallback((input) => {
    setScopeOutline(0);
    if (!input) return;
    const newSuggests = findSuggest.search(productList, input);
    if (!newSuggests.length) return;
    setSuggests(newSuggests);
    setShadowOf(SHADOW.NAV_SEARCH);
    setSuggestBox(true); // eslint-disable-next-line
  }, []);

  const hideSuggestBox = useCallback(() => setSuggestBox(false), [setSuggestBox]);
  const doThenHideSuggestBox = useCallback(() => {
    setOutline(false); // Wait to execute any click on Suggest Box, closes on callback
    return suggestBox ? hideSuggestBox() : null; // eslint-disable-next-line
  }, []);

  return [showSuggestBox, doThenHideSuggestBox, hideSuggestBox];
}