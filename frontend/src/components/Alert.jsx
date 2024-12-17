import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";



export const MessageSuccess = (message) =>
    toast(<p style={{ fontSize: 16 }}><b>Успіх!</b> {message}</p>, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: false,
      draggable: true,
      pauseOnHover: false,
      theme: "dark",
      type: "success",
      style: {
        zIndex: 1000,
        width: '500px',
        backgroundColor: '#0e1624',
    },
    }
);

export const MessageError = (message) =>
    toast(<p style={{ fontSize: 16 }}><b>Помилка!</b> {message}</p>, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        theme: "dark",
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: false,
        type: "error",
        style: {
            zIndex: 1000,
            width: '500px',
            backgroundColor: '#0e1624'
        },
    }
);