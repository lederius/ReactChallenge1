import React, { useState } from 'react';
import './App.css';
import $ from "jquery"
// add to Git
function App() {
  const [setShow, getShow] = useState("");
  // setShow = state value
  //getShow = function to change state

  const [showList, renderShows] = useState({
    shows: [],
    images: [],
    newResults: false
  })

  function getShows(e) {
    e.preventDefault()
    console.log('wehrer asfawd')
    console.log(e.target, "dsfaf")
    renderShows(previousState =>{
      return {...previousState,newResults:true}
    })
    let showName, showRequest;
    showName = setShow
    showRequest = `http://api.tvmaze.com/search/shows?q=${showName}`
    fetch(`http://api.tvmaze.com/search/shows?q=${showName}`, {
      method: "GET"
    })
      .then(response => { return response.json() })
      .then(data => {
        let showData = data.map((x) =>
          Object.values(x)[1]);
        return showData;
      })
      .then(showData => {
        let names, imgData, showNames;
        showNames = [];
        // $("#showName").val("");
        // $("#searchResults").empty();
        showData.map(x => {
          names = new RegExp(`${showName}`, 'i');
          imgData = Object.values(x)[19];
          if (names.test(Object.values(x)[2]) === true) {
            showNames.push([Object.values(x)[2], imgData]);
            if (imgData !== null) {
              // imgData = Object.values(x)[19];
              // $(`<p>${Object.values(x)[2]}</p><img src= ${Object.values(imgData)[0]}></img></hr>`).appendTo("#searchResults")
              renderShows(previousState =>{
                return {...previousState,images:showNames[1],shows:showNames[0]}
              })
            }
          }
        })
        if (showNames.length === 0) {
          $(`<p>No shows found with the name ${showName}</p></hr><p>Please try another search</p>`).appendTo("#searchResults")
        }
        console.log(showNames.map(x => x[0]).sort(), "part 1 answer");
        console.log(showNames, "results???")
      })
  }
// variable with form instead of copy?
  if (showList.newResults === false) {
    return (
      <div className="App">
        <h1>
          Bounteness Appretenship React.js Assessement
        </h1>
        <main>
          <div id="searchBox">
            <h2>Find A Show:</h2>
            <form id="searchForTvShow">
              <label for="showName">Show Name:</label>
              <input type="text" id="showName" placeholder="Show Name" required onChange={(e) => getShow(e.target.value)}></input>
              <button type="submit" onClick={getShows}>Find</button>
            </form>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>
          Displaying Results
        </h1>
        <main>
          <div id="searchBox">
            <h2>Find Another Show:</h2>
            <form id="searchForTvShow">
              <input type="text" id="showName" placeholder="Show Name" required onChange={(e) => getShow(e.target.value)}></input>
              <button type="submit" onClick={getShows}>Find</button>
            </form>
          </div>
          <div id="searchResults">
           <h1>{showList.shows.map(x=>{shows[x]})}</h1> 
          </div>
        </main>
      </div>
    );
  }
}

export default App;
