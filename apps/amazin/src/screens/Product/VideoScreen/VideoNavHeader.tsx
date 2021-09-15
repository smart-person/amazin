import { memo } from 'react';

type PropType = {
  genreLabels: GenreType[];
  active: LabelType;
  setActive: SetState;
};

function VideoNavHeader({ genreLabels, active, setActive }: PropType) {
  return (
    <nav className="m-header">
      <ul className="m-nav">
        {genreLabels.map((label, id) => (
          <li key={id} className={label === active ? ' active' : ''} onClick={() => setActive(label)}>
            {label.split(' ')[0]}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(VideoNavHeader);