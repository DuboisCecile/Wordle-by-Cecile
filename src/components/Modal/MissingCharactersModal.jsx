import Modal from './Modal';
import wantedImg from '../../../public/images/wanted.png';

export default function MissingCharactersModal({ setMissing }) {
  return (
    <Modal
      open={open}
      onClose={() => setMissing(false)}
      bgClass="bg-[url('../../../public/images/background.jpg')] bg-cover"
    >
      <div className="flex w-96 flex-col items-center gap-5 bg-white bg-opacity-90 p-10 text-center">
        <div className="text-xl font-bold">Oups ! Il semble qu'il manque certains caractères !</div>
        <img src={wantedImg} style={{ width: 200, height: 'auto' }} alt="wanted stamp" />
        <div className="text-xl font-bold">Vous devriez en avoir 5 !</div>
        <button
          className="group relative overflow-hidden rounded bg-green-500 px-5 py-2.5 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 hover:ring-2 hover:ring-green-400 hover:ring-offset-2"
          onClick={() => setMissing(false)}
        >
          <span className="ease absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 group-hover:-translate-x-40"></span>
          <span className="relative">OK</span>
        </button>
      </div>
    </Modal>
  );
}
