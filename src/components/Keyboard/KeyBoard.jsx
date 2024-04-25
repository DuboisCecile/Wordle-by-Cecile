import KeyboardSquare from '../Keyboard/KeyboardSquare';
import { KEYS } from '../../assets/words';

export default function KeyBoard({ handleKey }) {
  return (
    <div className="mt-4 grid grid-flow-row grid-cols-7 gap-2">
      {KEYS.map((key) => (
        <KeyboardSquare key={key.id || key} id={key.id || key} handleKey={handleKey}>
          {key.key || key}
        </KeyboardSquare>
      ))}
    </div>
  );
}
