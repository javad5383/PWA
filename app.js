(function () {
     addBtn.style.display = 'none';
    // console.log('1');
    if ('serviceWorker' in navigator) {
        // console.log('2');
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/PWA/service-worker.js', {scope: '/PWA/'})         //('/PWA/service-worker.js', {scope: '/PWA/'}) for github
                .then(registration => {
                    console.log('Service Worker is registered', registration);
                })
                .catch(err => {
                    console.error('Registration failed:', err);
                });
        });
    }


    let deferredPrompt;
    const addBtn = document.querySelector('#installBtn');
    console.log(addBtn);
    

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt fiered ');
        addBtn.style.display = 'block';
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        console.log(' Prevent Chrome 67');
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        // addBtn.style.display = 'block';
        return false;


    });
    addBtn.addEventListener('click', (event) => {
        if (deferredPrompt !== undefined) {
            // hide our user interface that shows our A2HS button
            addBtn.style.display = 'none';
            // Show the prompt

            deferredPrompt.prompt();
            console.log('Show the prompt');
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;

                });
        }
    });


})();

