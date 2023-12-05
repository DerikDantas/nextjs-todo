import { ToastOptions, toast } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark'
};

export const ToastError = (message: string) => {
  return toast.error(message, toastOptions);
};
