import { MAX_ITEM } from 'src/constants';
import { createId } from 'src/utils';
import { InputProps } from './CustomInput';

const createList = (max: number) => {
  const _max = Math.min(MAX_ITEM, max);
  const list = Array(_max).fill(0);
  return list.map((_, key) => ({ value: key + 1 }));
};

const Selects = ({ list }: { list: SelectType[] }) => (
  <>
    {list.map(({ value, children }) => (
      <option key={value} value={value} children={children || value} />
    ))}
  </>
);

export type CustomSelectProps = InputProps & {
  optgroup?: string;
  list?: SelectType[];
  max?: number;
  small?: boolean;
};

export default function CustomSelect({
  label,
  wrapClass = '',
  optgroup = '',
  list,
  max,
  small = false,
  ...rest
}: CustomSelectProps) {
  const selectList = list || createList(max || 1);

  return (
    <>
      {!!label && <label htmlFor={label}>{label}</label>}
      <div className={'select-wrapper ' + wrapClass}>
        <div className={`sprite__caret${small ? '' : ' xl'}`} />
        <select id={createId(optgroup || label)} className="tab__w6" {...rest}>
          {optgroup ? (
            <optgroup label={optgroup}>
              <Selects list={selectList} />
            </optgroup>
          ) : (
            <Selects list={selectList} />
          )}
        </select>
      </div>
    </>
  );
}
