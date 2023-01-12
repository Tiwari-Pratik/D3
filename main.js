import "./styles.css";
import * as d3 from "d3";

// console.log(d3);
// select methods

const h1 = d3.select("h1");
console.log(h1);

// let firstSvg = d3.select('svg');
let firstSvg = d3.select("#circles");
console.log(firstSvg);

let secondSvg = d3.select("#rects");
console.log(secondSvg);

let firstCircle = d3.select("circle");
console.log(firstCircle);

let firstRect = d3.select("rect");
console.log(firstRect);

let rectFirst = secondSvg.select("rect");
console.log(rectFirst);

let rectSecond = secondSvg.select("rect:nth-of-type(2)");
console.log(rectSecond);

secondSvg.select((d, i, n) => {
  console.log(d); // data  => undefined as no data is bound to this element as yet
  console.log(i); // index  => index of elements inside the selection group
  console.log(n); // group  => [svg#rects]
  console.log(n[i]); // => <svg id="rects" width="300" height="200"> </svg>
  console.log(this);
});

let allCircles = d3.selectAll(".svgarea circle");
console.log({ allCircles });

let allRects = d3.selectAll(".svgarea rect");
console.log({ allRects });

let allSvgs = d3.selectAll(".svgarea");
console.log({ allSvgs });

let allSvgCircles = allSvgs.selectAll("circle");
console.log({ allSvgCircles });

// Selection objects are iterable

for (let elem of allSvgCircles) {
  console.log(elem);
}

allSvgs.selectAll((d, i, n) => {
  console.log(d);
  console.log(i);
  console.log(n);
  console.log(n[i]);
  console.log(this);
});

const filtOddCircles = allCircles.filter(":nth-of-type(odd)");
console.log({ filtOddCircles });

const oddClassCircles = allCircles.filter(".odd");
console.log({ oddClassCircles });

const svgFiltOddCircles = allSvgCircles.filter(":nth-of-type(odd)");
console.log({ svgFiltOddCircles });

const filtCircles = allCircles.filter(function(d, i, n) {
  // console.log(d);
  // console.log(i);
  // console.log(n);
  // console.log(n[i]);
  // console.log(this);
  i % 2 == 0 ? (this.style.fill = "orange") : (this.style.fill = "pink");
  return (i + 1) % 2 !== 0;
});
console.log({ filtCircles });

let circlesM1 = d3.selectAll(".svgmerge1 circle");
let circlesM2 = d3.selectAll(".svgmerge2 circle");

console.log({ circlesM1, circlesM2 });

let circlesM1Odd = circlesM1.select(function(d, i, n) {
  if (i % 2 === 0) {
    this.style.fill = "indianred";
    return this;
  } else {
    return null;
  }
});

console.log({ circlesM1Odd });

let circlesM1Even = circlesM1.select(function(d, i, n) {
  if (i % 2 === 0) {
    return null;
  } else {
    this.style.fill = "orange";
    return this;
  }
});

console.log({ circlesM1Even });

const circlesM1Merged = circlesM1Odd.merge(circlesM1Even);
console.log({ circlesM1Merged });

let circlesM2Odd = circlesM2.select(function(d, i, n) {
  if (i % 2 === 0) {
    this.style.fill = "pink";
    return this;
  } else {
    return null;
  }
});

console.log({ circlesM2Odd });

let circlesM2Even = circlesM2.select(function(d, i, n) {
  if (i % 2 === 0) {
    return null;
  } else {
    this.style.fill = "yellowgreen";
    return this;
  }
});

console.log({ circlesM2Even });

const circlesM2Merged = circlesM2Odd.merge(circlesM2Even);
console.log({ circlesM2Merged });

let circlesM1MergedCirclesM2 = circlesM1Even.merge(circlesM2Odd);
console.log({ circlesM1MergedCirclesM2 });

let firstChildCircle = d3.select(".svgchild1").selectChild();
console.log({ firstChildCircle });

let secondChildCircle = d3.select(".svgchild1").selectChild(":nth-child(2)");
console.log({ secondChildCircle });

let allfirstChilds = d3.selectAll("svg").selectChild();
console.log({ allfirstChilds });

d3.select(".svgchild1").selectChild(function(c, i, cn) {
  console.log(c);
  console.log(i);
  console.log(cn);
});

d3.selectAll("svg").selectChild(function(c, i, cn) {
  console.log(c);
  console.log(i);
  console.log(cn);
});

let firstSvgChildren = d3.select(".svgchild1").selectChildren();
console.log({ firstSvgChildren });

let allSvgChildren = d3.selectAll("svg").selectChildren();
console.log({ allSvgChildren });

let allSvgCircleChildren = d3.selectAll("svg").selectChildren("circle");
console.log({ allSvgCircleChildren });

// project

const select = document.querySelector("#select");
const selectAll = document.querySelector("#select-all");
const filterOdd = document.querySelector("#filter-odd");
const filterEven = document.querySelector("#filter-even");
const selectedBtn = document.querySelector("#selection-span");
let selectionText = "";

select.addEventListener("click", (event) => {
  event.preventDefault();
  selectionText = "select";
  selectedBtn.textContent = selectionText;
  const allFirstChildSelectedSvg = d3.selectAll(".project svg").selectChild();
  console.log({ allFirstChildSelectedSvg });
  allFirstChildSelectedSvg.select(function(c, i, n) {
    this.style.fill = "#AADDC8";
    // console.log(this);
  });
});

selectAll.addEventListener("click", function(event) {
  event.preventDefault();
  selectionText = "select-all";
  selectedBtn.textContent = selectionText;
  const colors = ["#e6ffe6", "#ccffcc", "#99ff99", "#6bb36b"];
  const allChildSelectedSvg = d3.selectAll(".project svg").selectChildren();
  allChildSelectedSvg.select(function(c, i, n) {
    this.style.fill = colors[i];
  });
});

filterOdd.addEventListener("click", function(event) {
  event.preventDefault();
  selectionText = "filter-odd";
  selectedBtn.textContent = selectionText;
  const allOddChildSelectedSvg = d3
    .selectAll(".project svg")
    .selectChildren()
    .filter(":nth-of-type(odd)");
  // console.log({allOddChildSelectedSvg});
  allOddChildSelectedSvg.select(function(c, i, n) {
    this.style.fill = "#EBB3A9";
  });
});

filterEven.addEventListener("click", function(event) {
  event.preventDefault();
  selectionText = "filter-even";
  selectedBtn.textContent = selectionText;
  const allEvenChildSelectedSvg = d3
    .selectAll(".project svg")
    .selectChildren()
    .filter(":nth-of-type(even)");
  // console.log({allOddChildSelectedSvg});
  allEvenChildSelectedSvg.select(function(c, i, n) {
    this.style.fill = "#7D84B2";
  });
});

// attr methods

const mysvg = d3.select(".svgattr");
const mysvgCircles = mysvg.selectAll("circle");
console.log({ mysvgCircles });

const mysvgWidth = mysvg.attr("width");
console.log({ mysvgWidth });

mysvgCircles.attr("style", function(d, i, n) {
  return `fill:rgb(${Math.random() * (250 + i)
    },${Math.random() * (250 + i)},${Math.random() * (250 + i)})`;
});

// classed methods

const classLine1 = d3.select(".svgclass line");
const hasClassGray = classLine1.classed("gray");
console.log({ hasClassGray });

const allLines = d3.selectAll(".svgclass line");
const classGrayLines = allLines.classed("gray", true);
console.log({ classGrayLines });

allLines.classed("dash-array", function(d, i, n) {
  return i % 2 == 0 ? true : false;
});

// style methods

let svgStyle = d3.select(".svgstyle");
svgStyle.style("background-color", "pink");

let styleEllipses = svgStyle.selectChildren("ellipse");
console.log({ styleEllipses });

styleEllipses.select(function(d, i, n) {
  const ellipse = d3.select(this);
  ellipse
    .attr("cx", `${i * 150 + 110}`)
    .attr("cy", `${i * 150 + 80}`)
    .attr("rx", `${i * 20 + 50}`)
    .attr("ry", `${i * 20 + 70}`);
  // ellipse.style(
  //   "fill",
  //   `rgb(${Math.random() * 120},${Math.random() * 120},${Math.random() * 120})`
  // );
});

styleEllipses.style("fill", function(d, i, n) {
  return `rgb(${Math.random() * 120
    },${Math.random() * 120},${Math.random() * 120})`;
});

// property methods
