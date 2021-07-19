import React from 'react';
import { Link } from 'react-router-dom';

const InnerMenuItem = (props) => {
  const { className, label, linkTo, extraAction, setShadowFor } = props;

  if (!linkTo && !className) return <strong>{label}</strong>;

  if (linkTo === 'disabled')
    return (
      <Link to="#" className="disabled">
        {label}
      </Link>
    );

  if (linkTo.startsWith('https://'))
    //a href instead of Link for extern links
    return (
      <a href={linkTo} target="_blank" rel="noreferrer">
        {label}
      </a>
    );

  if (linkTo)
    return (
      <Link
        to={linkTo}
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          setShadowFor('');
          if (extraAction) extraAction();
        }}
      >
        {label}
      </Link>
    );

  return <div>{label}</div>;
};

export const MenuItem =
  (setShadowFor) =>
  ([label, linkTo, className, extraAction], id) => {
    return label === 'separator' ? (
      <div key={id} className="separator"></div>
    ) : (
      <li key={id}>
        <InnerMenuItem
          className={className}
          label={label}
          linkTo={linkTo}
          extraAction={extraAction}
          setShadowFor={setShadowFor}
        />
      </li>
    );
  };