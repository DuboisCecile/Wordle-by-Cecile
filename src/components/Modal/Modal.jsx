import XMark from '../../../public/images/Xmark.svg';
export default function Modal({ open, onClose, children, bgImg }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-transparent ' : 'invisible'}`}
      aria-hidden="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: bgImg }}
        className={`bg-cover rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        aria-hidden="true"
      >
        <button
          onClick={onClose}
          className="absolute right-7 top-7 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <img src={XMark} alt="closing X" className="w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
