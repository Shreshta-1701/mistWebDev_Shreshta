const display = document.getElementById('display');
let expr = '';

function updateDisplay() {
    display.textContent = expr === '' ? '0' : expr;
}

function evaluateExpression(input) {
    const mapped = input.replace(/×/g, '*').replace(/÷/g, '/');
    const result = Function(`"use strict"; return (${mapped})`)();
    if (!isFinite(result)) throw new Error('Math error');
    return result;
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        const action = btn.dataset.action;

        if (action === 'clear') {
            expr = '';
            updateDisplay();
            return;
        }

        if (action === 'delete') {
            expr = expr.slice(0, -1);
            updateDisplay();
            return;
        }

        if (action === 'equals') {
            try {
                const res = evaluateExpression(expr || '0');
                expr = String(res);
            } catch (e) {
                expr = 'Error';
            }
            updateDisplay();
            return;
        }
        if (val) {
            if (expr === '0' && val !== '.') expr = val;
            else expr += val;
            updateDisplay();
        }
    });
});
