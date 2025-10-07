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

const searchPais = async () => {
    const input = document.querySelector('#search').value;
    const pais = await fetch(`https://restcountries.com/v3.1/name/${input}`)
        .then(res => res.json())
        .then(res => res[0])
        .catch(err => {
            console.log(err);
            return err;
        });
    if (!pais) {
        alert('País Inválido.');
        return;
    }
    const saida = document.querySelector('#containerPaises');
    saida.innerHTML = createPais(pais, 'containerPaisUnico');
}

const showAllPaises = async () => {
    const saida = document.querySelector('#containerPaises');
    const paises = await fetch('https://restcountries.com/v3.1/region/america')
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            return err;
        });
    saida.innerHTML = paises.map(createPais).join('');
}

const createPais = (pais, classe = '') => {
    return `
    <div class="containerPais ${classe}">
        <img class="imagemPais" src="${pais.flags.png}" alt="Bandeira do ${pais.name.common}" />
        <p class="nomePais">País: ${pais.name.common}</p>
        <p class="capitalPais">Capital: ${pais.capital[0]}</p>
    </div>
    `;
}

showAllPaises();