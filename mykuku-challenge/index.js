let arr = [
  ["NOW", 523],
  ["2023", 560],
  ["2024", 582],
  ["2025", 601],
  ["2026", 629],
  ["2027", 659],
];

  $.get('C:\Etman\challenge\data.php')
  .done((data)=>{
  })

const max = arr.reduce((acc, [x, y]) => (acc > y ? acc : y), 0);

const height = 300;
const interval = 45;
const padding = -5;
const lineInterval = 14;

const data = arr.map(([x, y], i) => {

  let originalValue = y
  y = (y/ max) * height;
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  let tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  let dottedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  let price = document.createElementNS("http://www.w3.org/2000/svg", "text");
  
  circle.setAttribute("cx", i * interval + padding + 20);
  circle.setAttribute("cy", height - y - padding);
  circle.setAttribute("r", 5);
  circle.setAttribute("fill", "#FFFFFF");
  circle.setAttribute("stroke", "#854AF2");
  circle.setAttribute("stroke-width", "1.93px");
  document.getElementById("chart-svg").appendChild(circle);
  
  tick.setAttribute("x1", i * interval + padding + 20);
  tick.setAttribute("y1", 96 - 20);
  tick.setAttribute("x2", i * interval + padding + 20);
  tick.setAttribute("y2", 96 - 10);
  tick.setAttribute("stroke", "#999999");
  tick.setAttribute("stroke-width", "1.86px");
  
  document.getElementById("chart-svg").appendChild(tick);
  
  dottedLine.setAttribute("x1", 0);
  dottedLine.setAttribute("y1", i * lineInterval +11);
  dottedLine.setAttribute("x2", 255);
  dottedLine.setAttribute("y2", i * lineInterval +11);
  if(i != arr.length -1){
    dottedLine.setAttribute("stroke", "#122448");
    dottedLine.setAttribute("stroke-dasharray", "2");
    dottedLine.setAttribute("stroke-width", ".5px");
    dottedLine.setAttribute("opacity", ".5");
  }else{
    dottedLine.setAttribute("stroke", "#999999");
    dottedLine.setAttribute("stroke-width", "1.86px");
  }
  let year = document.createElement('li')
  year.innerHTML = x
  document.querySelector('#dates').append(year)
  
  document.getElementById("chart-svg").appendChild(dottedLine);
  
  if(i === 0 || i === arr.length - 1){
    price.setAttribute("x", i * interval);
    price.setAttribute("y", height - y - 5);
    price.setAttribute("fill", '#122448');
    price.classList = 'price'
    price.innerHTML = `$${originalValue}K`
    console.log(price)
    document.getElementById("chart-svg").appendChild(price);
  }
  
  return [i * interval + padding + 20, height - y - padding];
});

console.log(data.flat().join(" "));

$("#linea").attr("d", "M" + data.flat().join(" "));
