function convertPoundsToKg() {
    console.log('Starting Pounds to Kilograms conversion');
    const pounds = document.getElementById('pounds').value;
    console.log(`Input pounds value: ${pounds}`);
    
    if (pounds === '') {
        console.log('Error: Empty input value');
        document.getElementById('pounds-to-kg-result').textContent = 'Please enter a value';
        return;
    }
    
    const kilograms = parseFloat(pounds) * 0.45359237; // 1 pound = 0.45359237 kilograms
    console.log(`Conversion result: ${pounds} pounds = ${kilograms.toFixed(2)} kilograms`);
    document.getElementById('pounds-to-kg-result').textContent = `${pounds} pounds = ${kilograms.toFixed(2)} kilograms`;
    console.log('Pounds to Kilograms conversion completed successfully');
}

function convertKgToPounds() {
    console.log('Starting Kilograms to Pounds conversion');
    const kilograms = document.getElementById('kilograms').value;
    console.log(`Input kilograms value: ${kilograms}`);
    
    if (kilograms === '') {
        console.log('Error: Empty input value');
        document.getElementById('kg-to-pounds-result').textContent = 'Please enter a value';
        return;
    }
    
    const pounds = parseFloat(kilograms) / 0.45359237; // 1 kilogram = 2.20462262 pounds
    console.log(`Conversion result: ${kilograms} kilograms = ${pounds.toFixed(2)} pounds`);
    document.getElementById('kg-to-pounds-result').textContent = `${kilograms} kilograms = ${pounds.toFixed(2)} pounds`;
    console.log('Kilograms to Pounds conversion completed successfully');
}

// Add error logging for invalid input
function sanitizeInput(value) {
    // Remove any potentially dangerous characters
    return value.replace(/[<>&"'`]/g, '');
}

function validateInput(value, type) {
    // First sanitize the input
    const sanitizedValue = sanitizeInput(value);
    
    // Check if empty
    if (!sanitizedValue.trim()) {
        console.error(`Error: ${type} input is empty`);
        return { valid: false, message: 'Please enter a value' };
    }
    
    // Check if valid number
    const numValue = parseFloat(sanitizedValue);
    if (isNaN(numValue)) {
        console.error(`Error: Invalid ${type} input - not a number`);
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    // Check for reasonable range (0 to 1000000)
    if (numValue < 0 || numValue > 1000000) {
        console.error(`Error: ${type} input out of range`);
        return { valid: false, message: 'Please enter a value between 0 and 1,000,000' };
    }
    
    return { valid: true, value: numValue };
}

// Update conversion functions to use improved validation
function handlePoundsToKg() {
    convertPoundsToKg();
}

function handleKgToPounds() {
    convertKgToPounds();
}

async function convertPoundsToKg() {
    console.log('Starting Pounds to Kilograms conversion');
    const pounds = document.getElementById('pounds').value;
    console.log(`Input pounds value: ${pounds}`);
    
    const validation = validateInput(pounds, 'pounds');
    if (!validation.valid) {
        document.getElementById('pounds-to-kg-result').textContent = validation.message;
        return;
    }
    
    try {
        const response = await fetch(`/api/convert/pounds-to-kg?pounds=${validation.value}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Conversion failed');
        }
        
        console.log(`Conversion result: ${pounds} pounds = ${data.result}`);
        document.getElementById('pounds-to-kg-result').textContent = data.result;
        console.log('Pounds to Kilograms conversion completed successfully');
    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById('pounds-to-kg-result').textContent = 'Conversion failed. Please try again.';
    }
}

async function convertKgToPounds() {
    console.log('Starting Kilograms to Pounds conversion');
    const kilograms = document.getElementById('kilograms').value;
    console.log(`Input kilograms value: ${kilograms}`);
    
    const validation = validateInput(kilograms, 'kilograms');
    if (!validation.valid) {
        document.getElementById('kg-to-pounds-result').textContent = validation.message;
        return;
    }
    
    try {
        const response = await fetch(`/api/convert/kg-to-pounds?kilograms=${validation.value}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Conversion failed');
        }
        
        console.log(`Conversion result: ${kilograms} kilograms = ${data.result}`);
        document.getElementById('kg-to-pounds-result').textContent = data.result;
        console.log('Kilograms to Pounds conversion completed successfully');
    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById('kg-to-pounds-result').textContent = 'Conversion failed. Please try again.';
    }
}

// Update conversion functions to use validation
function convertPoundsToKg() {
    console.log('Starting Pounds to Kilograms conversion');
    const pounds = document.getElementById('pounds').value;
    console.log(`Input pounds value: ${pounds}`);
    
    if (pounds === '') {
        console.log('Error: Empty input value');
        document.getElementById('pounds-to-kg-result').textContent = 'Please enter a value';
        return;
    }
    
    if (!validateInput(pounds, 'pounds')) {
        document.getElementById('pounds-to-kg-result').textContent = 'Please enter a valid number';
        return;
    }
    
    const kilograms = parseFloat(pounds) * 0.45359237; // 1 pound = 0.45359237 kilograms
    console.log(`Conversion result: ${pounds} pounds = ${kilograms.toFixed(2)} kilograms`);
    document.getElementById('pounds-to-kg-result').textContent = `${pounds} pounds = ${kilograms.toFixed(2)} kilograms`;
    console.log('Pounds to Kilograms conversion completed successfully');
}

function convertKgToPounds() {
    console.log('Starting Kilograms to Pounds conversion');
    const kilograms = document.getElementById('kilograms').value;
    console.log(`Input kilograms value: ${kilograms}`);
    
    if (kilograms === '') {
        console.log('Error: Empty input value');
        document.getElementById('kg-to-pounds-result').textContent = 'Please enter a value';
        return;
    }
    
    if (!validateInput(kilograms, 'kilograms')) {
        document.getElementById('kg-to-pounds-result').textContent = 'Please enter a valid number';
        return;
    }
    
    const pounds = parseFloat(kilograms) / 0.45359237; // 1 kilogram = 2.20462262 pounds
    console.log(`Conversion result: ${kilograms} kilograms = ${pounds.toFixed(2)} pounds`);
    document.getElementById('kg-to-pounds-result').textContent = `${kilograms} kilograms = ${pounds.toFixed(2)} pounds`;
    console.log('Kilograms to Pounds conversion completed successfully');
}
