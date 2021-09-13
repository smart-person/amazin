import { useOutline } from '../../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { findSuggest } from 'src/utils';
import { SHADOW } from 'src/constants';

export function useKeyInput(setInput: SetState, setSuggests: SetState, submitSearch: FnType) {
  const { productList, setOutline, setSuggestBox } = useOutline();
  const { setShadowOf } = useShadow();

  const handleKeyInput: KeyEvent = ({ target: { value }, key }) => {
    switch (key) {
      case 'Enter':
        return submitSearch();

      case 'Escape':
        setSuggestBox(false);
        return setShadowOf('');

      default:
    }
    const newSuggests = findSuggest(productList, value);
    setSuggests(newSuggests);
    setSuggestBox(true);
    setInput(value);
    if (!newSuggests.length) return setShadowOf('');

    setShadowOf(SHADOW.NAV_SEARCH);
    return setOutline(true);
  };

  return { handleKeyInput };
}