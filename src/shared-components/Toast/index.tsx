import { ToastOptions, toast } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'light'
};

export class Toast {
  static success(message: string) {
    return toast.success(message, toastOptions);
  }

  static error(message: string) {
    return toast.error(message, toastOptions);
  }
}
