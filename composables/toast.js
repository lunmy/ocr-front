import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export function successToast(message) {
    toast.success(message, {
        autoClose: 8000,
        position: toast.POSITION.TOP_CENTER,
    });
}

export function errorToast(message) {
    toast.error(message, {
        autoClose: 8000,
        position: toast.POSITION.TOP_CENTER,
    });
}
