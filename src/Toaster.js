import Swal from "sweetalert2";

// This src/Toaster.js is for custom pop-ups

const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: true,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

const makeToast = (type, msg) => {
	Toast.fire({
		icon: type,
		title: msg,
	});
};

export default makeToast;
