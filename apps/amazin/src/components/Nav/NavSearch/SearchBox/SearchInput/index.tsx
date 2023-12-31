import { memo } from 'react';

import { useOutline } from '../../useOutline';
import { useSuggestBox } from './useSuggestBox';
import { useKeyInput } from './useKeyInput';

export type SearchInputProps = {
  input: string;
  setInput: SetStateType<string>;
  submitSearch: FnType;
};

function SearchInput({ input, setInput, submitSearch }: SearchInputProps) {
  const { inputRef, setOutline } = useOutline();
  const { showBox, hideBoxOnCallback } = useSuggestBox();
  const { handleKeyInput } = useKeyInput(setInput, submitSearch);

  const focusSuggestBox = () => {
    showBox(input);
    setOutline(true);
  };

  return (
    <div className="search__input">
      <input
        type="text"
        ref={inputRef}
        id="q"
        name="q"
        autoComplete="off"
        value={input}
        size={1}
        tabIndex={1}
        aria-label="search input"
        onClick={focusSuggestBox}
        onFocus={focusSuggestBox}
        onKeyUp={handleKeyInput}
        onChange={(e) => setInput(e.target.value)}
        onBlur={hideBoxOnCallback}
      />
    </div>
  );
}

export default memo(SearchInput, (prev, next) => prev.input === next.input);
