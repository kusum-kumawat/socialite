import { createPortal } from "react-dom";

function Modal({ children, isOpen, onClose, modalname }) {
  if (!isOpen) return null;
  return createPortal(
    <>
      <div
        className="h-screen w-screen bg-mbd z-40 fixed"
        onClick={onClose}
      ></div>
      <div className="fixed text-white z-50 left-2/4 top-2/4 translate-y-[-60%] translate-x-[-80%] rounded-xl bg-secondary ">
        {children}
      </div>
    </>,
    document.getElementById(modalname)
  );
}
export default Modal;
