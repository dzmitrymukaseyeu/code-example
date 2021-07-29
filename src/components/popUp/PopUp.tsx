import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  preventDuplicates: true,
  onclick: undefined,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'show',
  hideMethod: 'hide',
};

const Toasters = {
  success(message: string) {
    toastr.success(message);
  },
  error(message: string) {
    toastr.error(message);
  },
  warning(message: string) {
    toastr.warning(message);
  },
  info(message: string) {
    toastr.info(message);
  },
};

export default Toasters;