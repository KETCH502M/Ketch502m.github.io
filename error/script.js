let stop = false;

function consumirCPU() {
    while (!stop) {
        // Este bucle vacío consume recursos de la CPU
    }
}

document.getElementById('startButton').addEventListener('click', function() {
    stop = false;
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'inline';
    document.getElementById('warning').style.display = 'none';
    consumirCPU();
});

document.getElementById('stopButton').addEventListener('click', function() {
    stop = true;
    document.getElementById('startButton').style.display = 'inline';
    document.getElementById('stopButton').style.display = 'none';
});

// Verificar si la página se ha congelado cada 5 segundos
setInterval(function() {
    const startTime = Date.now();
    // Realizar una operación que debería ser rápida
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    
    // Si la operación tarda más de 100 milisegundos, la página se considera congelada
    if (elapsedTime > 100) {
        document.getElementById('warning').style.display = 'block';
    } else {
        document.getElementById('warning').style.display = 'none';
    }
}, 5000); // Verificar cada 5 segundos
