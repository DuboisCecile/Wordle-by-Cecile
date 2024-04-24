import KeyboardSquare from '../Keyboard/KeyboardSquare';
import { KEYS } from '../../assets/words';

export default function KeyBoard({ setBoard, setTries, tries }) {
  return (
    <div className="mt-4 grid grid-flow-row grid-cols-9 gap-2">
      {KEYS.map((key, index) => (
        <KeyboardSquare key={key} index={index} setBoard={setBoard} setTries={setTries} tries={tries}>
          {key}
        </KeyboardSquare>
      ))}
    </div>
  );
}
