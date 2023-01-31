import "./styles.css";
import * as d3 from "d3";
import { movieData } from "./prj_imdb";

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

const labelsFor = ["fname", "lname", "gender", "male", "female", "nomention"];
const labels = d3.selectAll("label");
labels.filter(function(d, i, n) {
  const d3Label = d3.select(this);
  d3Label.attr("for", labelsFor[i]);
});

d3.select("#fname").property("type", "text").property("placeholder", "John");
d3.select("#lname").property("type", "text").property("placeholder", "Doe");
d3.select("#submit").property("type", "submit").property("value", "Submit");

const genderInputs = d3.selectAll("#formsubmit > div input");
genderInputs.property("type", "checkbox");
const genderValues = ["male", "female", "nomention"];
genderInputs.property("value", function(d, i, n) {
  return genderValues[i];
});

const nomention = d3.select("#nomention");
nomention.property("checked", "true");

document.querySelector("#formsubmit").addEventListener("submit", () => {
  event.preventDefault();
  console.log(d3.select("#fname").property("value"));
  console.log(d3.select("#lname").property("value"));
  console.log(d3.select("#male").property("checked"));
  console.log(d3.select("#female").property("checked"));
  console.log(d3.select("#nomention").property("checked"));
});

// text method

const texts = d3.selectAll(".svgtext text");
texts.text(function(d, i, n) {
  return `Text ${i + 1}`;
});

// append method

const titleDiv = d3.select("#mytitle");
console.log({ titleDiv });
titleDiv.style("min-height", "300px").style("background-color", "#787679");
titleDiv.append("h1").text("Append");

const rectsData = [
  {
    x: "10",
    y: "100",
    width: "50",
    height: "30",
  },

  {
    x: "10",
    y: "150",
    width: "50",
    height: "30",
  },
];

const svgRects = d3.select("#svgtitle");

const rectSvg = svgRects
  .append("svg")
  .attr("width", "300")
  .attr("height", "300");

for (let i = 0; i < rectsData.length; i++) {
  const rect = rectSvg.append("rect");
  rect
    .attr("x", rectsData[i].x)
    .attr("y", rectsData[i].y)
    .attr("width", rectsData[i].width)
    .attr("height", rectsData[i].height);
}

// html method

const htmlDiv = d3.select("#htmldiv");
htmlDiv.html("<h2>This line is from D3</h2>");

htmlDiv.html(function(d, i, n) {
  let content = "";
  for (let i = 0; i < 5; i++) {
    content += `<p>Para with index: ${i} </p>`;
  }
  return content;
});

// insert method

const newsvg1 = d3.select("#newsvg1");
newsvg1
  .insert("text")
  .text("This line was inserted with text method")
  .attr("x", "5")
  .attr("y", "40");
newsvg1
  .insert("text", "text")
  .text("This line was inserted with text method using before selector")
  .attr("x", "5")
  .attr("y", "20");

const newsvg2 = d3.select("#newsvg2");
newsvg2
  .insert(
    function() {
      return document.createElementNS("http://www.w3.org/2000/svg", "text");
    },
    function() {
      return this.firstElementChild;
    }
  )
  .text("This is a text element.")
  .attr("x", "10")
  .attr("y", "50");

// remove method

const svgCircle = d3.select(".svgremove circle");
const removedCircle = svgCircle.remove();
console.log({ removedCircle });

// clone method

const thesvg = d3.select(".svgclone");
console.log({ thesvg });
const clonedSvg = thesvg.clone();

console.log({ clonedSvg });

const deepClonedsvg = thesvg.clone(true);
console.log({ deepClonedsvg });

// sort method

const paras = d3.selectAll("#parasort p");
paras.datum(function() {
  return this.innerText;
});

console.log({ paras });

paras.sort((a, b) => b - a);

d3.selectAll(".sortsvg circle")
  .datum(function() {
    return d3.select(this).attr("r");
  })
  .sort((a, b) => a - b)
  .attr("cx", function(d, i, n) {
    return 40 + i * 100;
  });

// raise method and lower method

d3.select("#svgraise rect:nth-of-type(1)").raise();
d3.select("#svgraise rect:nth-of-type(2)").raise();

d3.select("#svgraise rect:nth-of-type(3)").lower();

// project 2 -- imdb rating

const movieContainer = document.querySelector(".movies-container");
const movieList = document.createElement("div");
movieList.className = "movie-list";

movieData.forEach((mov, i, _) => {
  const movBtn = document.createElement("p");
  movBtn.className = "movie";
  movBtn.innerText = mov.name;
  movBtn.id = mov.id;
  movieList.append(movBtn);
});
movieContainer.append(movieList);
const detailsDiv = document.createElement("div");
detailsDiv.className = "movie-details";
movieContainer.append(detailsDiv);

movieList.addEventListener("click", function() {
  const target_id = event.target.id;

  const targetMovie = movieData.find((mov, i, _) => mov.id === target_id);
  detailsDiv.innerHTML = "";
  detailsDiv.innerHTML = `
  <h3><span>${targetMovie.name}</span></h3>
  <p>Content Rating: <span>${targetMovie.contentRating}</span></p>
    <p>Duration: <span>${targetMovie.duration}</span></p>
    <p>Star Rating: <span>${targetMovie.starRating}</span></p>
    <p>Votes: <span>${targetMovie.votes}</span></p>
    <p>Gross Collection (USD Mn): <span>${targetMovie.gross}</span></p>
  `;
});

// console.log({ checkboxes });

const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", function() {
  console.log("clicked");
  const checkboxes = d3.selectAll(".rating > input[type = checkbox]");
  const checkedSelection = checkboxes.select(function(d, i, n) {
    const checkbox = d3.select(this);
    const isChecked = checkbox.property("checked");
    const checkId = checkbox.property("id");
    const ratingLabel = document.querySelector(
      `.rating:has(>input[id=${checkId}]) label`
    );
    // console.log({ ratingLabel });
    const ratingLabelText = ratingLabel.textContent;
    // console.log({ isChecked, checkId });
    return { isChecked, checkId, text: ratingLabelText };
  });
  // console.log(checkedSelection._groups[0]);
  const checkedData = checkedSelection._groups[0];
  // console.log(checkedData);
  const filteredMovieData = [];
  if (!checkedData.some((data, i, _) => data.isChecked)) {
    // console.log("no chechbox ticked");
    alert("please select atleast one checkbox");
    return;
  }

  checkedData.forEach(function(data, i, _) {
    if (data.isChecked) {
      const filtMovies = movieData.filter(
        (mov, i, _) => mov.contentRating === data.text
      );
      // console.log(filtMovies);
      filteredMovieData.push(filtMovies);
    }
  });
  // console.log({ filteredMovieData });
  const filtArData = filteredMovieData.map((data, i, movie) => {
    return [movie[i][0].contentRating, data];
  });
  // console.log(filtArData);
  const filteredMoviesMap = new Map(filtArData);
  // console.log(filteredMoviesMap);
  // console.log(filteredMoviesMap.get("U"));
  console.log([...filteredMoviesMap.keys()]);
  const mapKeys = [...filteredMoviesMap.keys()];

  const ratingList = d3.select(".rating-list");
  ratingList.selectChildren().remove();
  mapKeys.forEach((key, i, _) => {
    console.log(key);
    const div = ratingList.append("div");
    div.classed("rating-info", "true");
    div.append("h3").text(`#${filteredMoviesMap.get(key).length}`);
    div.append("p").text(`"${key}" rating movie(s) selected`);
  });
  const legends = d3.select(".legends");
  legends.selectChildren().remove();
  const charts = d3.select(".charts");
  charts.selectChildren().remove();

  const grossDiv = charts.append("div").classed("gross", "true");
  const durationDiv = charts.append("div").classed("duration", "true");

  const grossSvg = grossDiv
    .append("svg")
    .attr("width", "100%")
    .attr("height", "500px");
  const durationSvg = durationDiv
    .append("svg")
    .attr("width", "100%")
    .attr("height", "500px");

  grossSvg
    .append("text")
    .text("Gross Collection inj USD Million")
    .attr("x", "10%")
    .attr("y", "10%")
    .style("font-size", "1rem");
  durationSvg
    .append("text")
    .text("Duration in Minutes")
    .attr("x", "10%")
    .attr("y", "10%")
    .style("font-size", "1rem");
  let movieLength = 0;
  let maxCollection = 0;
  let maxDuration = 0;
  let maxVotes = 0;
  const grossCollection = [];
  const durations = [];
  const votes = [];

  mapKeys.forEach((key, i, _) => {
    const data = filteredMoviesMap.get(key);
    movieLength += data.length;
    maxCollection = data.reduce((acc, val) => {
      return val.gross >= acc ? val.gross : acc;
    }, maxCollection);
    maxDuration = data.reduce((acc, val) => {
      return val.duration >= acc ? val.duration : acc;
    }, maxDuration);
    maxVotes = data.reduce((acc, val) => {
      return val.votes >= acc ? val.votes : acc;
    }, maxVotes);

    data.forEach((mov, i) => grossCollection.push(mov.gross));
    data.forEach((mov, i) => durations.push(mov.duration));
    data.forEach((mov, i) => votes.push(mov.votes));
  });
  console.log({
    movieLength,
    maxCollection,
    maxDuration,
    grossCollection,
    durations,
  });

  const legendColors = [];

  mapKeys.forEach((key, i, _) => {
    const ratingData = filteredMoviesMap.get(key);
    ratingData.forEach((data, i, _) => {
      const div = legends.append("div");
      div.classed("legend", "true");
      const svg = div.append("svg").attr("width", "100%").attr("height", "80%");
      const legendColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255
        })`;
      legendColors.push(legendColor);
      svg
        .append("circle")
        .attr("cx", "20%")
        .attr("cy", "50%")
        .attr("r", "2%")
        .style("fill", legendColor);
      svg
        .append("text")
        .text(data.name)
        .attr("x", "25%")
        .attr("y", "51%")
        .style("font-size", ".7rem")
        .style("color", "#aaaaaa");
    });
  });

  console.log(legendColors);

  const barHeight = 5;
  const numGaps = movieLength + 1;
  const gapHeights = ((100 - movieLength * barHeight) / numGaps / 100) * 80;

  for (let i = 0; i < movieLength; i++) {
    grossSvg
      .append("rect")
      .attr("x", "10%")
      .attr("y", `${10 + (i + 1) * gapHeights + i * barHeight}%`)
      .attr("width", `${(grossCollection[i] / maxCollection) * 80}%`)
      .attr("height", `${barHeight}%`)
      .style("fill", legendColors[i]);
    grossSvg
      .append("text")
      .text(grossCollection[i])
      .attr("x", `${10 + (grossCollection[i] / maxCollection) * 80 + 3}%`)
      .attr("y", `${13.5 + (i + 1) * gapHeights + i * barHeight}%`)
      .style("fonst-size", ".4rem");
  }
  for (let i = 0; i < movieLength; i++) {
    durationSvg
      .append("rect")
      .attr("x", "10%")
      .attr("y", `${10 + (i + 1) * gapHeights + i * barHeight}%`)
      .attr("width", `${(durations[i] / maxDuration) * 80}%`)
      .attr("height", `${barHeight}%`)
      .style("fill", legendColors[i]);
    durationSvg
      .append("text")
      .text(durations[i])
      .attr("x", `${10 + (durations[i] / maxDuration) * 80 + 3}%`)
      .attr("y", `${13.5 + (i + 1) * gapHeights + i * barHeight}%`)
      .style("fonst-size", ".4rem");
  }

  const votesDiv = d3.select(".votes-svg");
  votesDiv.selectChildren().remove();

  const votesSvg = votesDiv
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");
  console.log(votesSvg.property("height").baseVal);

  const maxRadius = 40;
  const circleGap = 10;
  // let prevradius = 0;
  for (let i = 0; i < movieLength; i++) {
    const radius = (votes[i] / maxVotes) * maxRadius;

    votesSvg
      .append("circle")
      .attr("cx", `${20 + (2 * i + 1) * maxRadius + i * circleGap}px`)
      .attr("cy", "50%")
      .attr("r", `${radius}px`)
      .style("fill", legendColors[i]);
    votesSvg
      .append("text")
      .text(votes[i])
      .attr("x", `${20 + (2 * i + 1) * maxRadius + i * circleGap - radius}px`)
      .attr("y", "22px")
      .style("fonst-size", ".4rem");
  }
});

// Data methods

const dataCirclesSvg1 = d3.selectAll("#data-div #data-svg1 circle");
console.log({ dataCirclesSvg1 });

const radSvg1 = [10, 20, 30];

const dataCircles1 = dataCirclesSvg1.data(radSvg1);
console.log({ dataCircles1 });

dataCircles1.attr("r", (d) => d);

const dataCirclesSvg2 = d3.selectAll("#data-div #data-svg2 circle");
const dataCircles2 = dataCirclesSvg2.data(radSvg1);
dataCircles2.attr("r", (d) => d);

const colors = ["red", "green", "blue"];

dataCircles2.data(colors);
dataCircles2.style("fill", (d) => d);

const allDataCircles = d3.selectAll("#data-div svg").selectAll("circle");
console.log({ allDataCircles });

const radSvg2 = [25, 35, 45];

const allDataSvgCircles = allDataCircles.data(radSvg2);
allDataSvgCircles.attr("r", (d) => d);

const dataCirclesSvg3 = d3.selectAll("#data-div #data-svg3 circle");

const radSvg3 = [20, 30, 40];

const dataCircles3 = dataCirclesSvg3.datum((d, i, n) => {
  return radSvg3[i];
});
console.log({ dataCircles3 });
dataCircles3.attr("r", (d) => d);

// enter method

const enterSvg = d3.select("#data-enter #svg-enter");
enterSvg.append("circle").attr("cx", "150").attr("cy", "50").attr("r", "40");
enterSvg.append("circle").attr("cx", "150").attr("cy", "150").attr("r", "30");

const dataArray = [10, 20, 30];

const allEnterCircles = enterSvg
  .selectAll("circle")
  .data(dataArray)
  .attr("r", (d) => d);

console.log({ allEnterCircles });

console.log({ enter: allEnterCircles.enter() });

allEnterCircles
  .enter()
  .append("circle")
  .attr("cx", "150")
  .attr("cy", "250")
  .attr("r", (d) => d);

// exit method

const exitSvgCircles = d3.selectAll("#data-exit #svg-exit circle");
console.log({ exitSvgCircles });

const dataArray2 = [15, 15, 15];

const exitDataSvgCircles = exitSvgCircles.data(dataArray2);
console.log(exitDataSvgCircles);

const exit = exitDataSvgCircles.exit();
console.log({ exit });
exit.remove();

exitDataSvgCircles.attr("r", (d) => d);

// join method

const joinSvg = d3.select("#div-join #svg-join");
const svgData = [10, 20, 30];
const joinCircles = joinSvg.selectAll("circle");
const dataJoinCircles = joinCircles.data(svgData);
const joinedCircles = dataJoinCircles.join("circle");
console.log({ joinedCircles });
joinedCircles
  .attr("cx", function(d, i, n) {
    return 150;
  })
  .attr("cy", function(d, i, n) {
    return d + i * 50;
  })
  .attr("r", (d) => d);

const svgData1 = [5, 10, 15, 20];

const newJoinedCircles = joinedCircles
  .data(svgData1)
  .join("circle")
  .attr("cx", function(d, i, n) {
    return 150;
  })
  .attr("cy", function(d, i, n) {
    return d + i * 50;
  })
  .attr("r", (d) => d);
console.log(newJoinedCircles);

const svgData2 = [20, 30];

const newJoinedCircles1 = newJoinedCircles
  .data(svgData2)
  .join("circle")
  .attr("cx", function(d, i, n) {
    return 150;
  })
  .attr("cy", function(d, i, n) {
    return d + i * 50;
  })
  .attr("r", (d) => d);
console.log(newJoinedCircles1);

const newJoinedCircles2 = newJoinedCircles1.data(["red", "blue"]).join(
  (enter) => console.log(enter),
  // (update) => console.log(update),
  (update) => update.style("fill", (d) => d),
  (exit) => console.log(exit)
);
console.log(newJoinedCircles2);

const joinSvg1 = d3.select("#div-join #svg-join1");
let dArr1 = [10, 20, 30];
let joinCircles1 = joinSvg1.selectAll("circle");
joinCircles1 = joinCircles1
  .data(dArr1, function(d) {
    return d.toString();
  })
  .join("circle")
  .attr("cx", function(d, i, n) {
    return 150;
  })
  .attr("cy", function(d, i, n) {
    return d + i * 50;
  })
  .attr("r", (d) => d);

console.log(joinCircles1);

dArr1 = [10, 15, 30];

joinCircles1 = joinCircles1
  .data(dArr1, function(d) {
    return d.toString();
  })
  .join("circle")
  .attr("cx", function(d, i, n) {
    return 150;
  })
  .attr("cy", function(d, i, n) {
    return d + i * 50;
  })
  .attr("r", (d) => d);

console.log(joinCircles1);

dArr1 = [5, 30];

joinCircles1 = joinCircles1
  .data(dArr1, function(d) {
    return d.toString();
  })
  .join("circle")
  .attr("cx", function(d, i, n) {
    return 150;
  })
  .attr("cy", function(d, i, n) {
    return d + i * 50;
  })
  .attr("r", (d) => d);

console.log(joinCircles1);

// Handling events
// on method

const onSvg = d3.select("#on-div #on-svg");
onSvg.on("click", function(e, d) {
  console.log({ e });
  console.log({ d });
});

onSvg.on("click", null);

onSvg.on("click mouseover", function(e, d) {
  console.log(e.type);
  console.log(this);
  if (e.type === "click") {
    d3.select(this).style("fill", "green");
  }
  if (e.type === "mouseover") {
    d3.select(this).style("fill", "red");
  }
});

onSvg.on("mouseup", function(e, d) {
  console.log("mouse up");
});

onSvg.on("click", function(e, d) {
  d3.select(this).style("fill", "pink");
});

onSvg.on(".", null);

const onRects = onSvg.selectAll("rect");

onRects.on("click.1 click.2", function(e, d) {
  console.log(e);
  if (e.target.__on[0].name === "1") {
    d3.select(this).style("fill", "orange");
  }
  if (e.target.__on[1].name === "2") {
    d3.select(this).style("fill", "peachpuff");
  }
});

onRects.on(".1 .2", null);

// dispatch method

const dispSvg1 = d3.select("#dispatch-div #dispatch-svg1");
const dispCircle1 = dispSvg1.select("circle");
dispCircle1.on("radius", function(e, d) {
  console.log({ custome: e });
  console.log({ customd: d });
  d3.select(this).attr("r", e.detail);
});

dispCircle1.dispatch("radius", {
  bubbles: true,
  detail: "40",
  cancelable: true,
});
const dispSvg2 = d3.select("#dispatch-tiv #dispatch-svg2");
const dispCircles2 = dispSvg2.selectAll("circle");

dispCircles2.on("color", function(e, d) {
  d3.select(this).style("fill", e.detail);
});

dispCircles2.dispatch("color", function(d, i, n) {
  return {
    detail: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255
      })`,
  };
});

// pointer method

const pointerSvg = d3.select("#pointer-div #pointer-svg");
pointerSvg.on("click", function(e, d) {
  console.log(d3.pointer(e));
});
const pointerCircle = pointerSvg.select("circle");
pointerCircle.on("click", function(e, d) {
  // console.log(d3.pointer(e, pointerCircle));
  console.log(d3.pointer(e, pointerSvg));
});

// pointers method

const pointersSvg = d3.select("#pointers-div #pointers-svg");
pointersSvg.on("click", function(e, d) {
  console.log(d3.pointers(e));
});
const pointersRect = pointersSvg.select("rect");
pointersRect.on("click", function(e, d) {
  console.log(d3.pointers(e, pointersSvg));
});
