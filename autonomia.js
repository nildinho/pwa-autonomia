document.addEventListener('DOMContentLoaded', function () {
    let calcularButton = document.getElementById('calcular');
    let limparButton = document.getElementById('limpar');
    let resultadoElement = document.getElementById('resultado');

    calcularButton.addEventListener('click', calcularAutonomia);
    limparButton.addEventListener('click', limparCampos);

    function calcularAutonomia() {
        let capacidadeTanque = Number(document.getElementById('capacidadeTanque').value);
        let consumoMedio = Number(document.getElementById('consumoMedio').value);

        let autonomia = (capacidadeTanque / consumoMedio) * 100;
        resultadoElement.textContent = `Autonomia do carro é aproximadamente: ${autonomia.toFixed(2)} km por litro`;
    }

    function limparCampos() {
        document.getElementById('capacidadeTanque').value = '';
        document.getElementById('consumoMedio').value = '';
        resultadoElement.textContent = '';
    }
});
