document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navTabs = document.querySelectorAll('nav h3');
    const inputTab = document.querySelector('.input-tab');
    const resultTab = document.querySelector('.result-tab');
    const convertBtn = document.getElementById('convertBtn');
    const resetBtn = document.getElementById('resetBtn');
    const unitFromInput = document.getElementById('unitFrom');
    const unitToInput = document.getElementById('unitTo');
    const dropdownFrom = document.getElementById('dropdownFrom');
    const dropdownTo = document.getElementById('dropdownTo');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const inputValue = document.getElementById('inputValue');
    const resultText = document.getElementById('resultText');
    const inputPlaceholder = document.querySelector('.input-tab p:first-of-type');
    
    // Current unit type (default is length)
    let currentUnitType = 'length';
    
    // Init: Show only length units, hide others
    filterUnitsByType(currentUnitType);
    
    // Tab switching
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            if (this.closest('.result-tab')) {
                return; // Don't allow tab switching in result tab
            }
            
            // Remove active class from all tabs in the same navigation
            const parent = this.closest('nav');
            parent.querySelectorAll('h3').forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update current unit type
            currentUnitType = this.id.toLowerCase().replace('result', '');
            
            // Update input placeholder
            if (currentUnitType === 'length') {
                inputPlaceholder.textContent = 'Enter the length to convert';
            } else if (currentUnitType === 'weight') {
                inputPlaceholder.textContent = 'Enter the weight to convert';
            } else if (currentUnitType === 'temperature') {
                inputPlaceholder.textContent = 'Enter the temperature to convert';
            }
            
            // Clear inputs
            unitFromInput.value = '';
            unitToInput.value = '';
            
            // Filter units based on selected type
            filterUnitsByType(currentUnitType);
        });
    });
    
    // Toggle dropdown menus
    unitFromInput.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownFrom.classList.toggle('show');
        dropdownTo.classList.remove('show');
    });
    
    unitToInput.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownTo.classList.toggle('show');
        dropdownFrom.classList.remove('show');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdownFrom.classList.remove('show');
        dropdownTo.classList.remove('show');
    });
    
    // Select dropdown item
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.getAttribute('data-value');
            const text = this.textContent.trim();
            
            if (dropdownFrom.contains(this)) {
                unitFromInput.value = text;
                unitFromInput.setAttribute('data-value', value);
                dropdownFrom.classList.remove('show');
            } else if (dropdownTo.contains(this)) {
                unitToInput.value = text;
                unitToInput.setAttribute('data-value', value);
                dropdownTo.classList.remove('show');
            }
        });
    });
    
    // Convert button click
    convertBtn.addEventListener('click', function() {
        const value = parseFloat(inputValue.value);
        const fromUnit = unitFromInput.getAttribute('data-value');
        const toUnit = unitToInput.getAttribute('data-value');
        
        if (isNaN(value) || !fromUnit || !toUnit) {
            alert('Please enter a valid value and select both units');
            return;
        }
        
        const result = convertUnit(value, fromUnit, toUnit);
        resultText.textContent = `${value} ${fromUnit} = ${result}${toUnit}`;
        
        // Show result tab
        inputTab.style.display = 'none';
        resultTab.style.display = 'block';
        
        // Update result tab navigation to match input tab
        const activeTab = document.querySelector('.input-tab nav h3.active').id;
        document.querySelectorAll('.result-tab nav h3').forEach(tab => {
            tab.classList.remove('active');
        });
        const resultTabId = activeTab + 'Result';
        document.getElementById(resultTabId).classList.add('active');
    });
    
    // Reset button click
    resetBtn.addEventListener('click', function() {
        // Clear inputs
        inputValue.value = '';
        
        // Show input tab
        resultTab.style.display = 'none';
        inputTab.style.display = 'block';
    });
    
    // Filter units based on type
    function filterUnitsByType(type) {
        dropdownItems.forEach(item => {
            if (type === 'length' && item.classList.contains('length-unit')) {
                item.style.display = 'block';
            } else if (type === 'weight' && item.classList.contains('weight-unit')) {
                item.style.display = 'block';
            } else if (type === 'temperature' && item.classList.contains('temp-unit')) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Unit conversion function
    function convertUnit(value, fromUnit, toUnit) {
        // Conversion constants
        const conversionFactors = {
            // Length conversions (to meters)
            meters: 1,
            feet: 0.3048,
            inches: 0.0254,
            centimeters: 0.01,
            kilometers: 1000,
            miles: 1609.34,
            
            // Weight conversions (to kilograms)
            kilograms: 1,
            pounds: 0.453592,
            grams: 0.001,
            ounces: 0.0283495,
            tons: 907.185,
            
            // Temperature conversions need special handling
        };
        
        // Special case for temperature
        if (fromUnit === 'celsius' || fromUnit === 'fahrenheit' || fromUnit === 'kelvin') {
            return convertTemperature(value, fromUnit, toUnit);
        }
        
        // Standard conversion for length and weight
        // First convert to base unit (meters for length, kilograms for weight)
        const valueInBaseUnit = value * conversionFactors[fromUnit];
        
        // Then convert from base unit to target unit
        const convertedValue = valueInBaseUnit / conversionFactors[toUnit];
        
        return convertedValue.toFixed(2);
    }
    
    // Temperature conversion
    function convertTemperature(value, fromUnit, toUnit) {
        let celsius;
        
        // Convert to Celsius first
        if (fromUnit === 'celsius') {
            celsius = value;
        } else if (fromUnit === 'fahrenheit') {
            celsius = (value - 32) * 5/9;
        } else if (fromUnit === 'kelvin') {
            celsius = value - 273.15;
        }
        
        // Convert from Celsius to target unit
        if (toUnit === 'celsius') {
            return celsius.toFixed(2);
        } else if (toUnit === 'fahrenheit') {
            return (celsius * 9/5 + 32).toFixed(2);
        } else if (toUnit === 'kelvin') {
            return (celsius + 273.15).toFixed(2);
        }
    }
});
