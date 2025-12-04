export function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then((registration) => {
                    console.log("Service Worker registrado:", registration);
                })
                .catch((error) => {
                    console.error("Error registrando Service Worker:", error);
                });
        });
    }
}
