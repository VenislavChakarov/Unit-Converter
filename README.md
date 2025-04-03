# Unit Converter

A simple, elegant web-based unit converter that allows users to convert between different units of measurement.

## Features

- Convert between various units for:
  - Length (meters, feet, inches, centimeters, kilometers, miles)
  - Weight (kilograms, pounds, grams, ounces, tons)
  - Temperature (Celsius, Fahrenheit, Kelvin)
- Clean, user-friendly interface
- Simple tab navigation between unit types
- Dropdown menus for easy unit selection
- Instant conversion with the click of a button

## Usage

1. Select the type of conversion (Length, Weight, or Temperature)
2. Enter the value you want to convert
3. Select the unit to convert from using the dropdown menu
4. Select the unit to convert to using the dropdown menu
5. Click "Convert" to see the result
6. Click "Reset" to start a new conversion

## Implementation Details

The Unit Converter is built using:
- HTML5 for structure
- CSS3 for styling
- Vanilla JavaScript for functionality

No external libraries or frameworks are required, making it lightweight and fast.

## Conversion Formulas

### Length
All length conversions are based on meters as the standard unit:
- 1 meter = 1 meter
- 1 foot = 0.3048 meters
- 1 inch = 0.0254 meters
- 1 centimeter = 0.01 meters
- 1 kilometer = 1000 meters
- 1 mile = 1609.34 meters

### Weight
All weight conversions are based on kilograms as the standard unit:
- 1 kilogram = 1 kilogram
- 1 pound = 0.453592 kilograms
- 1 gram = 0.001 kilograms
- 1 ounce = 0.0283495 kilograms
- 1 ton = 907.185 kilograms

### Temperature
Temperature conversions use specific formulas:
- Celsius to Fahrenheit: (C × 9/5) + 32
- Fahrenheit to Celsius: (F - 32) × 5/9
- Celsius to Kelvin: C + 273.15
- Kelvin to Celsius: K - 273.15

## Installation

Simply download or clone the repository and open `index.html` in any modern web browser.

```
git clone https://github.com/yourusername/Unit-Converter.git
cd Unit-Converter
```

## License

This project is licensed under the terms of the license included in the repository.

