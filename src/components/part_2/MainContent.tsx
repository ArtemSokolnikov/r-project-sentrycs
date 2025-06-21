import { useEffect, useState } from 'react';
import words from '../../assets/wordle-bank.txt?raw';
import style from '../../css_modules/MainContent.module.css';
import { MyActionListener } from '../../utils/MyActionListener';
import Board from './Board';
import Keyboard from './Keyboard';

const actionListener = new MyActionListener();
const MAX_LETTERS = 5;

const MainContent = () => {
  const [board, setBoard] = useState(Array(MAX_LETTERS).fill(''));
  const [currentPosition, setСurrentPosition] = useState(0);
  const [status, setStatus] = useState<'default' | 'valid' | 'invalid'>('default');
  const [dictionary, setDictionary] = useState<Set<string>>(new Set());

  useEffect(() => {
    const wordList = words
      .split('\n')
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length === MAX_LETTERS);
    setDictionary(new Set(wordList));

    actionListener.registerListener('key', onSelect);
    actionListener.registerListener('delete', onDelete);
    actionListener.registerListener('enter', onEnter);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') actionListener.emit('enter', null);
      else if (event.key === 'Backspace') actionListener.emit('delete', null);
      else if (/^[a-zA-Z]$/.test(event.key)) actionListener.emit('key', event.key.toUpperCase());
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      actionListener.removeListener('key');
      actionListener.removeListener('delete');
      actionListener.removeListener('enter');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, currentPosition]);

  const onSelect = (key: string) => {
    if (currentPosition >= MAX_LETTERS) return;
    const newBoard = [...board];
    newBoard[currentPosition] = key;
    setBoard(newBoard);
    setСurrentPosition(currentPosition + 1);
    setStatus('default');
  };
  const onDelete = () => {
    if (currentPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentPosition - 1] = '';
    setСurrentPosition(currentPosition - 1);
    setBoard(newBoard);
    setStatus('default');
  };

  const onEnter = () => {
    if (currentPosition !== MAX_LETTERS) {
      setStatus('invalid');
      return;
    }
    const word = board.join('').toLowerCase();
    if (dictionary.has(word)) {
      setStatus('valid');
    } else {
      setStatus('invalid');
    }
  };
  return (
    <div className={style.content}>
      <div className={style.gameZone}>
        <Board board={board} status={status} />
        <Keyboard actionListener={actionListener} />
      </div>
    </div>
  );
};
export default MainContent;
