import React from 'react';
import './App.css';
import $ from "jquery"

function App() {
  function getTVShowNames(e) {
    e.preventDefault();
    let showName, showRequest;
    showName = $("#showName").val();
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
        $("#showName").val("");
        $("#searchResults").empty();
        showData.map(x => {
          names = new RegExp(`${showName}`, 'i');
          imgData = Object.values(x)[19];
          console.log(showData.length, "+++++++++++++++++++++=")
          if (names.test(Object.values(x)[2]) === true) {
            showNames.push([Object.values(x)[2], imgData]);
            if (imgData !== null) {
              imgData = Object.values(x)[19];
              $(`<p>${Object.values(x)[2]}</p><img src= ${Object.values(imgData)[0]}></img></hr>`).appendTo("#searchResults")
            }
          }
        })
        if(showNames.length === 0){
          $(`<p>No shows found with the name ${showName}</p></hr><p>Please try another search</p>`).appendTo("#searchResults")
        }
        console.log(showNames.map(x => x[0]).sort(), "part 1 answer");
      })
  }
  return (
    <div className="App">
      <h1>
        Bounteness Appretenship React.js Assessement
      </h1>
      <main>
        <div id="searchContainer">
          <form id="searchForTvShow">
            <label for="showName">Show Name:</label>
            <input type="text" id="showName" placeholder="Show Name" required></input>
            <button type="submit" onClick={getTVShowNames}>Find</button>
          </form>
        </div>
        <div id="searchResults"></div>
      </main>
    </div>
  );
}

export default App;
