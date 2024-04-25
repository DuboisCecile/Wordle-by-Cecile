import Modal from './Modal';

export default function WinnerModal({ handleRestart, chosenWord, tries, setWinOrLose }) {
  return (
    <Modal open={open} onClose={() => setWinOrLose('')} bgImg="url('public/images/confettis.png')">
      <div className="flex w-96 flex-col items-center gap-5 bg-white bg-opacity-90 p-10 text-center">
        <div className="text-xl font-bold">
          Félicitations ! Vous avez trouvé le mot en {tries.row} coup{tries.row > 1 && 's'} !
        </div>
        {/* <img src={confettiImg} style={{ width: 200, height: 'auto' }} alt="wanted stamp" /> */}
        <div className="text-xl font-bold">Le mot était {chosenWord.join('')}</div>
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
