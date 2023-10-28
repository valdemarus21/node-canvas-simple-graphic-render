const { createCanvas } = require('canvas');
const fs = require('fs');

let userData = JSON.parse(fs.readFileSync('userData.json', 'utf8'));
userData.orderValues = userData.months.map(() => Math.floor(Math.random() * 301) + 200);
fs.writeFileSync('userData.json', JSON.stringify(userData, null, 2));

const canvasWidth = 1367;
const canvasHeight = 762;
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);
const maxOrderValue = Math.max(...userData.orderValues);
const xGap = (canvasWidth - 100) / userData.months.length;
let xPosition = xGap / 2 + 100; 


ctx.fillStyle = '#000000';
ctx.font = 'bold 20px Arial';
ctx.fillText('Графік щомісячних продажів', canvasWidth / 2 - 100, 30);


ctx.font = 'bold 14px Arial';
ctx.fillText('Місяці', canvasWidth / 2 - 50, canvasHeight - 10);
ctx.save();
ctx.rotate(-Math.PI / 2);
ctx.fillText('Кількість продажів', -canvasHeight / 2 - 30, 20);
ctx.restore();
const scaleGap = (canvasHeight - 150) / 5;
for (let i = 0; i <= 5; i++) {
	const value = Math.round((maxOrderValue / 5) * i);
	ctx.fillStyle = '#000000';
	ctx.fillText(value.toString(), 55, canvasHeight - i * scaleGap - 50);
	ctx.beginPath();
	ctx.moveTo(90, canvasHeight - i * scaleGap - 50); 
	ctx.lineTo(100, canvasHeight - i * scaleGap - 50);
	ctx.stroke();
}
ctx.fillStyle = '#4A90E2';
ctx.font = '12px Arial';
for (let i = 0; i < userData.months.length; i++) {
	const barHeight = (userData.orderValues[i] / maxOrderValue) * (canvasHeight - 100); 
	ctx.fillRect(xPosition - 20, canvasHeight - barHeight - 50, 40, barHeight); 

	ctx.fillStyle = '#4A90E2';
	ctx.fillText(userData.months[i], xPosition - 20, canvasHeight - 30);
	ctx.fillText(userData.orderValues[i].toString(), xPosition - 20, canvasHeight - barHeight - 65); 

	xPosition += xGap;
}

fs.writeFileSync('chart.png', canvas.toBuffer('image/png'));

console.log('Chart saved as chart.png');
