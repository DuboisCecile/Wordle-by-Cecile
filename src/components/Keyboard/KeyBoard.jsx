import KeyboardSquare from '../Keyboard/KeyboardSquare';
import { KEYS } from '../../assets/words';
import { convertArrayToObject } from '../../utils/utils';

export default function KeyBoard({ handleKey, board }) {
  const keysStatus = convertArrayToObject(
    board.flat().filter((cell) => cell !== null && cell !== undefined),
    'value'
  );

  return (
    <div className="mt-4 grid grid-flow-row grid-cols-7 gap-2">
      {KEYS.map((key) => {
        return (
          <KeyboardSquare
            key={key.id || key}
            id={key.id || key}
            handleKey={handleKey}
            extraClass={keysStatus[key.id]?.status ? keysStatus[key.id]?.status : ''}
          >
            {key.key || key}
          </KeyboardSquare>
        );
      })}
    </div>
  );
}
