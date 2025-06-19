
  const form = document.getElementById('formNama');
  const input = document.getElementById('inputNama');
  const ucapan = document.getElementById('ucapan');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let nama = input.value.trim();
    if (nama === '') {
      ucapan.textContent = 'Tolong masukkan nama!';
      return;
    }
    ucapan.textContent = `Halo, ${nama}!`;
    input.value = '';
  });

//===============================================//
// Kalkulator /
//===============================================//
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyEl = document.getElementById('history');
let history = [];

function updateHistory(entry) {
  history.unshift(entry);
  if (history.length > 10) history.pop();
  historyEl.innerHTML = history.map(e => `<div class="history-item">${e}</div>`).join('');
}

function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}

function calculate(op) {
  let a = parseFloat(input1.value);
  let b = parseFloat(input2.value);
  if (isNaN(a) || (isNaN(b) && !['sqrt','factorial'].includes(op))) {
    alert('Masukkan angka valid!');
    return;
  }
  let res;
  switch(op) {
    case 'add': res = a + b; break;
    case 'subtract': res = a - b; break;
    case 'multiply': res = a * b; break;
    case 'divide': res = a / b; break;
    case 'power': res = Math.pow(a, b); break;
    case 'modulo': res = a % b; break;
    case 'sqrt': res = Math.sqrt(a); break;
    case 'log': res = Math.log10(a); break;
    case 'ln': res = Math.log(a); break;
    case 'sin': res = Math.sin(a); break;
    case 'cos': res = Math.cos(a); break;
    case 'tan': res = Math.tan(a); break;
    case 'factorial':
      if (!Number.isInteger(a) || a < 0) { alert('Factorial hanya untuk bilangan bulat >=0'); return; }
      res = factorial(a); break;
    default: return;
  }
  display.textContent = res;
  updateHistory(`${op}(${a}${op === 'power' ? ',' + b : ''}) = ${res}`);
}

document.getElementById('clear').addEventListener('click', () => {
  input1.value = '';
  input2.value = '';
  display.textContent = '0';
});

buttons.forEach(btn => {
  const op = btn.dataset.op;
  if (op) btn.addEventListener('click', () => calculate(op));
});