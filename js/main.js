if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg = await navigator.serviceWorker.register('/sw.js', { type: 'module' });

            console.log('Service worker registered successfully!', reg);
        } catch (err) {
            console.log('Service worker registration failed.', err);
        }
    });
}

const createPais = (pais) => {
    return `
    <div>
        <img src="${pais.flags.png}" alt="Bandeira do Brasil" />
    </div>
    `;
}