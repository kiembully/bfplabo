import { toast } from 'react-toastify'

export const notify = (text) => toast.error(text, {
  position: 'bottom-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
})

export const success = (text) => toast.success(text, {
  position: 'top-center',
  autoClose: 500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
})
