import { memo } from 'react';
import { Link } from 'react-router-dom';
import { splitBoldTexts } from 'src/utils';

export type SuggestRowProps = {
  row: string;
  onClick: FnType;
};

function SuggestRow({ row, onClick }: SuggestRowProps) {
  const cells = splitBoldTexts(row);
  const text = cells.join('');
  return (
    <Link
      to={`/search/name/${text}`}
      onClick={() => {
        onClick(text);
      }}
    >
      {cells.map((cell, id) => (
        <span key={id}>{id & 1 ? <b>{cell}</b> : <span>{cell}</span>}</span>
      ))}
    </Link>
  );
}

export default memo(SuggestRow);
