function convertPoundsToKg() {
    const pounds = document.getElementById('pounds').value;
    if (pounds === '') {
        document.getElementById('pounds-to-kg-result').textContent = 'Please enter a value';
        return;
    }
    
    const kilograms = parseFloat(pounds) * 0.45359237; // 1 pound = 0.45359237 kilograms
    document.getElementById('pounds-to-kg-result').textContent = `${pounds} pounds = ${kilograms.toFixed(2)} kilograms`;
}

function convertKgToPounds() {
    const kilograms = document.getElementById('kilograms').value;
    if (kilograms === '') {
        document.getElementById('kg-to-pounds-result').textContent = 'Please enter a value';
        return;
    }
    
    const pounds = parseFloat(kilograms) / 0.45359237; // 1 kilogram = 2.20462262 pounds
    document.getElementById('kg-to-pounds-result').textContent = `${kilograms} kilograms = ${pounds.toFixed(2)} pounds`;
}
