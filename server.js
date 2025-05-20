const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./logger');
const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

logger.info('Starting server initialization...');

// Add logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Serve static files
logger.info('Setting up static file serving...');
app.use(express.static(__dirname));

// Serve index.html for all routes
logger.info('Setting up route handlers...');
app.get('/', (req, res) => {
    logger.info('Serving index.html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints for conversions
app.get('/api/convert/pounds-to-kg', (req, res) => {
    const { pounds } = req.query;
    if (!pounds) {
        return res.status(400).json({ error: 'Pounds value is required' });
    }
    
    const validation = validateInput(pounds, 'pounds');
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }
    
    const kilograms = validation.value * 0.45359237;
    logger.info(`Converted ${pounds} pounds to ${kilograms.toFixed(2)} kilograms`);
    res.json({ result: `${pounds} pounds = ${kilograms.toFixed(2)} kilograms` });
});

app.get('/api/convert/kg-to-pounds', (req, res) => {
    const { kilograms } = req.query;
    if (!kilograms) {
        return res.status(400).json({ error: 'Kilograms value is required' });
    }
    
    const validation = validateInput(kilograms, 'kilograms');
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }
    
    const pounds = validation.value / 0.45359237;
    logger.info(`Converted ${kilograms} kilograms to ${pounds.toFixed(2)} pounds`);
    res.json({ result: `${kilograms} kilograms = ${pounds.toFixed(2)} pounds` });
});

const PORT = process.env.PORT || 3001;
logger.info(`Starting server on port ${PORT}...`);
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    logger.info('Server initialization completed successfully');
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Import validation function from script.js
function validateInput(value, type) {
    // First sanitize the input
    const sanitizedValue = sanitizeInput(value);
    
    // Check if empty
    if (!sanitizedValue.trim()) {
        return { valid: false, message: 'Please enter a value' };
    }
    
    // Check if valid number
    const numValue = parseFloat(sanitizedValue);
    if (isNaN(numValue)) {
        return { valid: false, message: 'Please enter a valid number' };
    }
    
    // Check for reasonable range (0 to 1000000)
    if (numValue < 0 || numValue > 1000000) {
        return { valid: false, message: 'Please enter a value between 0 and 1,000,000' };
    }
    
    return { valid: true, value: numValue };
}

function sanitizeInput(value) {
    // Remove any potentially dangerous characters
    return value.replace(/[<>&"'`]/g, '');
}
