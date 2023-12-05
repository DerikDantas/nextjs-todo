import React from 'react';
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as ModalAria,
  ModalOverlay
} from 'react-aria-components';
import { IoMdClose } from 'react-icons/io';

interface IModalProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  heading?: string;
}

export default function Modal({
  trigger,
  content,
  footer,
  heading
}: IModalProps) {
  return (
    <DialogTrigger>
      {trigger}
      <ModalOverlay
        className={({ isEntering, isExiting }) => `
    fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur
    ${isEntering ? 'animate-in fade-in duration-300 ease-out' : ''}
    ${isExiting ? 'animate-out fade-out duration-200 ease-in' : ''}
  `}
      >
        <ModalAria
          className={({ isEntering, isExiting }) => `
      w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
      ${isEntering ? 'animate-in zoom-in-95 ease-out duration-300' : ''}
      ${isExiting ? 'animate-out zoom-out-95 ease-in duration-200' : ''}
    `}
        >
          <Dialog role="alertdialog" className="outline-none relative">
            {({ close }) => (
              <>
                {heading ? (
                  <div className="flex justify-between items-center">
                    <Heading
                      slot="title"
                      className="text-xxl font-semibold leading-6 my-0 text-slate-700"
                    >
                      {heading}
                    </Heading>

                    <button type="button" onClick={close}>
                      <IoMdClose size={24} />
                    </button>
                  </div>
                ) : null}

                <hr className="my-3" />

                {content}

                {footer ? (
                  <div className="mt-6 flex justify-end gap-2">{footer}</div>
                ) : null}
              </>
            )}
          </Dialog>
        </ModalAria>
      </ModalOverlay>
    </DialogTrigger>
  );
}
