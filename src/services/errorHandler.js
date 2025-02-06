import * as bootstrap from 'bootstrap';

export function handleError(error) {
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  console.log(toastLiveExample);

  if (error.response) {
    console.error('Error de respuesta:', error.response.data);
    console.error('Código de estado:', error.response.status);
    console.error('Headers:', error.response.headers);

    if (error.response.status === 404) {
      var toastBody = document
        .getElementById('liveToast')
        .getElementsByClassName('toast-body');

      toastBody[0].innerHTML =
        'Resource not found - Code: ' + error.response.status;
      toastBootstrap.show();
    }
  } else if (error.request) {
    console.error('Error de solicitud:', error.request);
    var toastBody = document
      .getElementById('liveToast')
      .getElementsByClassName('toast-body');

    toastBody[0].innerHTML =
      'Could not connect to the server. Please try again later.';
    toastBootstrap.show();
  } else {
    console.error('Error:', error.message);
    var toastBody = document
      .getElementById('liveToast')
      .getElementsByClassName('toast-body');

    toastBody[0].innerHTML = 'An unexpected error occurred.';
  }
}
