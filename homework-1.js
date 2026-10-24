const readline = require('node:readline');

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  if (price <= 0) {
    return 0;
  }

  let count = 0;

  while (budget >= price) {
    budget -= price;
    count++;
  }

  return count;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }

  if (distance <= 10) {
    return 200;
  }

  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
  let count = 0;

  for (let step = 1; step <= height; step++) {
    if (step > 10) {
      console.log('Дальше лестница не построена');
      break;
    }

    if (step === 4) {
      continue;
    }

    console.log(`Ступень ${step}`);
    count++;
  }

  console.log(`Всего построено: ${count}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');

rl.question('Ваш выбор: ', (choice) => {
  switch (choice.trim()) {
    case '1':
      rl.question('Категория билета: ', (category) => {
        rl.question('Бюджет: ', (budget) => {
          printTicketResult(Number(category), Number(budget));
          rl.close();
        });
      });
      break;
    case '2':
      rl.question('Расстояние: ', (distance) => {
        rl.question('Сумма заказа: ', (total) => {
          printDelivery(Number(distance), Number(total));
          rl.close();
        });
      });
      break;
    case '3':
      rl.question('Высота лестницы: ', (height) => {
        printSteps(Number(height));
        rl.close();
      });
      break;
    default:
      console.log('такой задачи нет');
      rl.close();
  }
});
