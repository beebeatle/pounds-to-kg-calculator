function convert() {
    const pounds = document.getElementById('pounds').value;
    if (pounds === '') {
        document.getElementById('result').textContent = 'Please enter a value';
        return;
    }
    
    const kilograms = parseFloat(pounds) * 0.45359237; // 1 pound = 0.45359237 kilograms
    document.getElementById('result').textContent = `${pounds} pounds = ${kilograms.toFixed(2)} kilograms`;
}
