// Toggle button functionality
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', function() {
        const toggleGroup = this.getAttribute('data-toggle');
        const value = this.getAttribute('data-value');
        
        // Remove active class from all buttons in the same group
        document.querySelectorAll(`[data-toggle="${toggleGroup}"]`).forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// Age validation
const ageInput = document.getElementById('age');
const ageWarning = document.getElementById('ageWarning');

ageInput.addEventListener('input', function() {
    const age = parseInt(this.value);
    
    if (age && (age < 30 || age > 69)) {
        this.classList.add('error');
        ageWarning.classList.add('show');
    } else {
        this.classList.remove('error');
        ageWarning.classList.remove('show');
    }
    
    // Also check for valid input
    if (this.value && !isNaN(this.value)) {
        if (!this.classList.contains('error')) {
            this.style.borderColor = '#4ade80';
        }
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Form submission
document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all numeric input values
    const bloodPressureSystolic = parseFloat(document.getElementById('bloodPressureSystolic').value) || 0;
    const bloodPressureDiastolic = parseFloat(document.getElementById('bloodPressureDiastolic').value) || 0;
    const age = parseFloat(document.getElementById('age').value) || 0;
    const glucose = parseFloat(document.getElementById('glucose').value) || 0;
    const egfr = parseFloat(document.getElementById('egfr').value) || 0;
    const hdl = parseFloat(document.getElementById('hdl').value) || 0;
    const totalCholesterol = parseFloat(document.getElementById('totalCholesterol').value) || 0;
    
    // Calculate sum of all numeric values
    const sum = bloodPressureSystolic + bloodPressureDiastolic + age + glucose + egfr + hdl + totalCholesterol;
    
    // Get toggle values (for future use if needed)
    const toggleValues = {
        sex: document.querySelector('[data-toggle="sex"].active')?.getAttribute('data-value'),
        hypertension: document.querySelector('[data-toggle="hypertension"].active')?.getAttribute('data-value'),
        diabetes: document.querySelector('[data-toggle="diabetes"].active')?.getAttribute('data-value'),
        smoking: document.querySelector('[data-toggle="smoking"].active')?.getAttribute('data-value')
    };
    
    // Display result
    const resultDisplay = document.getElementById('result');
    const resultValue = document.getElementById('resultValue');
    
    resultValue.textContent = sum.toFixed(1);
    resultDisplay.classList.add('show');
    
    // Add a subtle animation to the result
    resultValue.style.transform = 'scale(0.8)';
    setTimeout(() => {
        resultValue.style.transform = 'scale(1)';
    }, 100);
    
    // Log all collected data (for debugging or future use)
    console.log('Form Data:', {
        numeric: {
            bloodPressureSystolic,
            bloodPressureDiastolic,
            age,
            glucose,
            egfr,
            hdl,
            totalCholesterol,
            sum
        },
        toggles: toggleValues
    });
});

// Add input validation feedback for other numeric inputs
const inputs = document.querySelectorAll('input[type="number"]:not(#age)');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value && !isNaN(this.value)) {
            this.style.borderColor = '#4ade80';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// Optional: Auto-focus first input on page load
window.addEventListener('load', function() {
    document.querySelector('input[type="number"]').focus();
});