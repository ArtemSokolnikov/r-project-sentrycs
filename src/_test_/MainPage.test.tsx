import { render, screen } from '@testing-library/react';
import MainContent from '../components/part_2/MainContent';
import userEvent from '@testing-library/user-event';

test('adds 5 letters and displays on board', async () => {
  render(<MainContent />);

  const user = userEvent.setup();
  await user.keyboard('ABCDE');
  const cells = screen.getAllByTestId('cell');
  const filled = cells.filter((cell) => cell.textContent !== '');

  expect(filled).toHaveLength(5);
});

test('removes last letter correctly', async () => {
  render(<MainContent />);

  const user = userEvent.setup();
  await user.keyboard('AB');
  await user.keyboard('{Backspace}');
  const cells = screen.getAllByTestId('cell');
  const textOfCell = cells.map((cell) => cell.textContent);

  expect(textOfCell).toContain('A');
  expect(textOfCell).not.toContain('B');
});

test('invalid status if typing unavaliable word', async () => {
  render(<MainContent />);

  const user = userEvent.setup();
  await user.keyboard('AAAAA{Enter}');
  const cells = screen.getAllByTestId('cell');
  const hasRedCells = cells.some((cell) => cell.className.includes('red'));

  expect(hasRedCells).toBe(true);
});
