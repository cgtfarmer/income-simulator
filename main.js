let newNodeDaysOnly = false;

const startingCapitalUI = document.querySelector('#starting-capital');
const monthlyContributionUI = document.querySelector('#monthly-contribution');
const interestRateUI = document.querySelector('#interest-rate');
const incrementsUI = document.querySelector('#increments');
const resultsUI = document.querySelector('#results');

let startingCapital = null;
let monthlyContribution = null;
let interestRate = null;
let increments = null;

function main() {
  simulate();
}

function simulate() {
  startingCapital = parseInt(startingCapitalUI.value);
  monthlyContribution = parseInt(monthlyContributionUI.value);
  interestRate = parseFloat(interestRateUI.value);
  increments = incrementsUI.value;
  resultsUI.innerHTML = '';

  for (let i = 100; i <= 12500; i += 100) {
    // income, year, semiyear, quarter, month, week, day
    const row = `
      <tr>
        <td>${i}</td>
        <td>${round(howLong('yearly', i))} years</td>
        <td>${round(howLong('semiyearly', i))} years</td>
        <td>${round(howLong('quarterly', i))} years</td>
        <td>${round(howLong('monthly', i))} years</td>
        <td>${round(howLong('weekly', i))} years</td>
        <td>${round(howLong('daily', i))} years</td>
      </tr>
    `;
    results.insertAdjacentHTML('beforeend', row);
  }
}

function howLong(frequency, amount) {
  let month = 0;
  let holdings = startingCapital;
  let income = 0;
  while ((income < amount) || income == null) {
    month += 1;
    holdings *= (1 + (interestRate / 12));
    holdings += monthlyContribution;
    switch(frequency) {
      case 'yearly':
        income = holdings * interestRate;
        break;
      case 'semiyearly':
        income = holdings * (interestRate / 2);
        break;
      case 'quarterly':
        income = holdings * (interestRate / 4);
        break;
      case 'monthly':
        income = holdings * (interestRate / 12);
        break;
      case 'weekly':
        income = holdings * (interestRate / 52);
        break;
      case 'daily':
        income = holdings * (interestRate / 365);
        break;
      default:
        income = null;
    }
    // console.log(`${month} ${holdings} ${interestRate/12} ${income}`);
  }

  return round(month/12);
}

function toggleNewNodeDays() {
  newNodeDaysOnly = !newNodeDaysOnly;

  const rows = document.querySelectorAll('tr');
  if (newNodeDaysOnly) {
    rows.forEach((e) => {
      if (e.children[1].innerHTML == '+0') {
        e.hidden = true;
      }
    });
  } else {
    rows.forEach((e) => {
      e.hidden = false;
    });
  }
}

function changeIncrements() {
  const select = document.querySelector('#increments');
  document.querySelector('#results').innerHTML = '';

  if (select.value == 'daily') {
    document.querySelector('#toggle-new-node-days').hidden = false;
  } else {
    document.querySelector('#toggle-new-node-days').hidden = true;
  }
}

function round(x) {
  return Math.round(x * 100) / 100
}

main();

