import Swal, { SweetAlertIcon } from 'sweetalert2';

const modalWidth = window.innerWidth < 600 ? "90%" : "50%";

export const showSuccessAlert = async (title: string, message: string) => {
    await Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        width: modalWidth,
        confirmButtonColor: '#00ADD9',
    });
};

export const showErrorAlert = async (title: string, message: string) => {
    await Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        width: modalWidth,
        confirmButtonColor: '#00ADD9',
    });
};

export const showWarningAlert = async (title: string, message: string) => {
    await Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        width: modalWidth,
        confirmButtonColor: '#00ADD9',
    });
};

export const showInfoAlert = async (title: string, message: string) => {
    await Swal.fire({
        icon: 'info',
        title: title,
        text: message,
        width: modalWidth,
        confirmButtonColor: '#00ADD9',
    });
};

export const showConfirmAlert = async (title: string, message: string) => {
    const result = await Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00ADD9',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        width: modalWidth,
    });

    return result.isConfirmed;
};

export const showCustomHtmlAlert = async (title: string, htmlContent: string, icon: SweetAlertIcon) => {
    await Swal.fire({
        icon: icon,
        title: title,
        html: `<pre style="text-align: left; white-space: pre-wrap; font-family: inherit;">${htmlContent}</pre>`,
        width: "600px",
        confirmButtonColor: "#00ADD9",
    });
};