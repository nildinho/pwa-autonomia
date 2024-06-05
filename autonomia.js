document.addEventListener('DOMContentLoaded', function () {
    const calcularButton = document.getElementById('calcular');
    const limparButton = document.getElementById('limpar');
    const resultadoElement = document.getElementById('resultado');

    calcularButton.addEventListener('click', calcularAutonomia);
    limparButton.addEventListener('click', limparCampos);

    function calcularAutonomia() {
        let capacidadeTanque = parseFloat(document.getElementById('capacidadeTanque').value);
        let consumoMedio = parseFloat(document.getElementById('consumoMedio').value);

        let autonomia = (capacidadeTanque / consumoMedio) * 100;
        resultadoElement.textContent = `Autonomia do carro é aproximadamente: ${autonomia.toFixed(2)} km por litro`;
    }

    function limparCampos() {
        document.getElementById('capacidadeTanque').value = '';
        document.getElementById('consumoMedio').value = '';
        resultadoElement.textContent = '';
    }
});
