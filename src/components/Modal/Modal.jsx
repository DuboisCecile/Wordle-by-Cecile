export default function Modal({ open, onClose, children, bgClass }) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-black/65' : 'invisible'}`}
      aria-hidden="true"
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${bgClass ? bgClass : 'bg-white'} rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        aria-hidden="true"
      >
        <button
          onClick={onClose}
          className="absolute right-7 top-7 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <img src="../../../public/images/Xmark.svg" alt="closing X" className="w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}