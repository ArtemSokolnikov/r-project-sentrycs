import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import clsx from 'clsx';
import style from '../../css_modules/Keyboard.module.css';
import Key from './Key';
import { KeyboardProps } from '../../types';

const firstRow = 'QWERTYUIOP'.split('');
const secondRow = 'ASDFGHJKL'.split('');
const thirdRow = ['ENTER', ...'ZXCVBNM'.split(''), 'DEL'];

const Keyboard:React.FC<KeyboardProps> = ({actionListener}) => {
  return (
    <div className={style.keyboard}>
      <div className={style.row}>
        {firstRow.map((key) => (
          <Key key={key} keyVal={key} actionListener={actionListener} />
        ))}
      </div>
      <div className={style.row}>
        {secondRow.map((key) => (
          <Key key={key} keyVal={key} actionListener={actionListener} />
        ))}
      </div>
      <div className={clsx(style.row, style.thirdRow)}>
        {thirdRow.map((key) => (
          <Key
            keyVal={key}
            key={typeof key === 'string' ? key : 'DEL'}
            actionListener={actionListener}
            icon={key === 'DEL' ? <BackspaceOutlinedIcon /> : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
