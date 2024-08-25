import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  message: string;
  token: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, email,token }) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (isOpen && modalRef.current) {
          modalRef.current.showModal();
        } else if (modalRef.current) {
          modalRef.current.close();
        }
      }, [isOpen]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* Button to close the modal */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="text-lg font-semibold">Login Successful</h3>
        <p className="py-4  text-blue-600">Email: {email}</p>
        <p className='py-4 text-blue-600'>Token: {token}</p>
        <p className="py-4">{message}</p>
      </div>
    </dialog>
    
  );
};

export default Modal;
