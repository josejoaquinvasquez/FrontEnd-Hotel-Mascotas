const botonPersonaNatural = document.getElementById('btnpn');
const botonPersonaJuridica = document.getElementById('btnpj');

botonPersonaNatural.addEventListener('click', function() {
    botonPersonaNatural.style.backgroundColor = '#111';
    botonPersonaJuridica.style.backgroundColor = "rgba(17, 17, 17, 0.25)";

});

botonPersonaJuridica.addEventListener('click', function() {
    botonPersonaNatural.style.backgroundColor = 'rgba(17, 17, 17, 0.25)';
    botonPersonaJuridica.style.backgroundColor = '#111';

});