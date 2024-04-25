import Modal from './Modal';
import gameOverImg from '../../../public/images/game_over.png';

export default function GameOverModal({ handleRestart, setWinOrLose }) {
  return (
    <Modal open={open} onClose={() => setWinOrLose('')}>
      <div className="flex w-96 flex-col items-center gap-5 bg-white bg-opacity-90 p-10 text-center">
        <img src={gameOverImg} style={{ width: 200, height: 'auto' }} alt="wanted stamp" />
        <div className="text-xl font-bold">Désolé, vous avez perdu ! Vous avez épuisé vos 6 essais !</div>
        <button
          className="z-10 flex items-center justify-center rounded-md bg-green-800 p-2 font-bold text-white"
          onClick={handleRestart}
        >
          Rejouer
        </button>
      </div>
    </Modal>
  );
}
