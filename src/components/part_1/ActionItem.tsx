import React, { useEffect } from 'react';
import { actionListener } from '../../utils/actionListenerInstance';

const ActionItem: React.FC = () => {
  useEffect(() => {
    actionListener.registerListener('PRINT', (data) =>
      console.log(`Don't tell me what I ${data} or ${data}'t do`)
    );

    actionListener.registerListener('PRINT', (data) =>
      console.log(`I eat pickles right of the ${data}`)
    );

    try {
      actionListener.emit('PRINT', 'Can');
    } catch (error) {
      console.error(error);
    }

    actionListener.removeListener('PRINT');

    try {
      actionListener.emit('PRINT', 'Can');
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <div></div>;
};

export default ActionItem;
