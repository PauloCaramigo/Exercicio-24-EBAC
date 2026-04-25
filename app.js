const buttonInstallPWA = document.getElementById('installPWA')

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.log(err));
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  buttonInstallPWA.style.display = "block";
})

buttonInstallPWA.addEventListener("click", () => {
  if(!deferredPrompt) return;

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choice) => {
    console.log(choice.outcome);
    deferredPrompt = null;
    buttonInstallPWA.style.display = "none";
  })
})