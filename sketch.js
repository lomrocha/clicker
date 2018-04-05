let gold = 0;
let amountPS = 0;

let goldButton;

let goldMineButton;

let goldMinePrice = 100;
let goldMines = 0;

let bankButton;

let bankPrice = 1500;
let banks = 0;

let amount = 1;
let radios = document.getElementsByName('amount');

function setup() {
	createCanvas(5000, 200);

	goldButton = createButton("Click for Gold");
	goldButton.mousePressed(getGold);

	goldMineButton = createButton("Buy GoldMine")
	goldMineButton.mousePressed(getGoldMine);

	bankButton = createButton("Buy Bank");
	bankButton.mousePressed(getBank);

	generateGold();
}

function draw() {
	background(0, 255, 0);

	for (let index = 0; index < radios.length; ++index) {
		if (radios[index].checked) {
			amount = parseInt(radios[index].value);
		}
	}

	textHandler();
}

priceCalc = (price, amount, index = 0) => {
	let total = price;
	let count = 0;

	while (count < amount) {
		let newPrice = int(price * 1.05);
		price = newPrice;
		if (count < amount - 1) {
			total += price;
		}
		count++;
	}

	if (index == 1) {
		return total;
	}

	return price;
}

function textHandler() {
	let texts = [
		"Gold: " + gold,
		"Gold per second: " + amountPS,
		"Goldmine	: " + goldMines,
		"Goldmine price - " + "One: " + priceCalc(goldMinePrice, 1, 1) + " / Ten: " + priceCalc(goldMinePrice, 10, 1) + " / Hundred: " + priceCalc(goldMinePrice, 100, 1),
		"Bank : " + banks,
		"Bank price: " + bankPrice];

	for (let index = 0; index < texts.length; ++index) {
		text(texts[index], 5, 20 + (index * 15));
	}
}

getBuilding = (price, amount, multiplier) => {
	gold -= price * amount;
	//amountPS += amount * multiplier;
}

getGold = () => (gold++);

getGoldMine = () => {
	if (gold >= priceCalc(goldMinePrice, amount)) {
		goldMines += amount;
		getBuilding(goldMinePrice, amount, 1);
		let newPrice = int(goldMinePrice *= 1.05);
		goldMinePrice = newPrice;
	}
}

getBank = () => {
	if (gold >= priceCalc(bankPrice, amount)) {
		banks += amount;
		getBuilding(bankPrice, amount, 25);
		let newPrice = int(bankPrice *= 1.05);
		bankPrice = newPrice;
	}
}

function generateGold() {
	gold += amountPS;

	setTimeout(generateGold, 1000);
}
