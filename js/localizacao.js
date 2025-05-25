function mostrarBotaoAtivarGPS() {
  const aviso = document.getElementById('aviso-localizacao');
  aviso.innerHTML = `
    ❌ Não foi possível obter a localização.<br>
    Por favor, ative o GPS ou aceite a permissão.
    <br><br>
    <button onclick="tentarNovamente()" class="botao-gps">🔄 Ativar GPS</button>
  `;
}

function tentarNovamente() {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const aviso = document.getElementById('aviso-localizacao');
      aviso.classList.add("ocultar");

      const userid = '525019daefcb432ca5c9562518bf1bc6';

      fetch('https://appnfcinformation-c8hah7bvgmeecvff.westeurope-01.azurewebsites.net/Localizacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          userKey: userid,
          latitude: pos.coords.latitude.toString(),
          longitude: pos.coords.longitude.toString()
        })
      })
      .then(res => res.json())
      .then(data => console.log("✅ Enviado", data))
      .catch(err => console.error("❌ Erro:", err));
    },
    function (err) {
      mostrarBotaoAtivarGPS();
    }
  );
}

window.addEventListener('load', () => {
  const aviso = document.getElementById('aviso-localizacao');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        console.log("📍 Localização obtida:");
        console.log("Latitude:", pos.coords.latitude);
        console.log("Longitude:", pos.coords.longitude);
        aviso.classList.add("ocultar");

        const userid = '525019daefcb432ca5c9562518bf1bc6';

        fetch('https://appnfcinformation-c8hah7bvgmeecvff.westeurope-01.azurewebsites.net/Localizacao', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          },
          body: JSON.stringify({
            userKey: userid,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString()
          })
        })
        .then(res => res.json())
        .then(data => console.log("✅ Enviado", data))
        .catch(err => console.error("❌ Erro:", err));
      },
      function (err) {
        mostrarBotaoAtivarGPS();
      }
    );
  } else {
    aviso.innerHTML = "⚠️ O seu navegador não suporta geolocalização.";
  }
});
