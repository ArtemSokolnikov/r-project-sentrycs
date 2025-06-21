import React from 'react';
import style from '../../css_modules/Key.module.css';
import { KeyProps } from '../../types';

const Key: React.FC<KeyProps> = ({ keyVal, actionListener, icon }) => {

  const handleClick = () => {
    if (keyVal === 'DEL') actionListener.emit('delete', null);
    else if (keyVal === 'ENTER') actionListener.emit('enter', null);
    else actionListener.emit('key', keyVal);
  };

  return (
    <div className={style.key} onClick={handleClick}>
      {icon || keyVal}
    </div>
  );
};

export default Key;
