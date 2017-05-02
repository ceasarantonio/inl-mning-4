window.onload = function (event) {
  let game = document.getElementById('game');
  let year = document.getElementById('year');
  let manufacturer = document.getElementById('manufacturer');
  let btnSend = document.getElementById('btnSend');
  let btnSortGame = document.getElementById('btnSortGame');
  let btnSortYear = document.getElementById('btnSortYear');
  let btnSortMan = document.getElementById('btnSortMan');
  let tableSort = document.getElementById('tableSort');
  let btnList = document.getElementById('btnList');
  let tableList = document.getElementById('tableList');
  let numberInput = document.getElementById('numberInput');
  let btnSortFirst = document.getElementById('btnSortFirst');
  let btnSortLast = document.getElementById('btnSortLast');

  btnSend.disabled = true;
  tableList.style.visibility = "hidden";


  //<<<<<<<<<<<<<<<<<<<<<<<<<function>>>>>>>>>>>>>>>>>>>>>>>>
  function send() {
    let message = {
      Game: game.value,
      Year: year.value,
      Manufacturer: manufacturer.value
    }
    firebase.database().ref('games-d8300/').push(message);
    game.value = '';
    year.value = '';
    manufacturer.value = '';
  };

  function table() {
    firebase.database().ref('games-d8300/').on('value', function (snapshot) {
      tableList.style.visibility = "visible";
      snapshot.forEach(messageRef => {
        let message = messageRef.val();
        let tr = document.createElement('tr');
        tr.innerHTML = "<td>" + message.Game + "</td><td>" + message.Year + "</td><td>" + message.Manufacturer + "</td>";
        tableSort.appendChild(tr);

      })
    })
  };

  function clear() {
    tableSort.innerHTML = '';
  };

  function checkInput() {
    if (game.value == '' || year.value == '' || manufacturer.value == '') {
      btnSend.disabled = true;
    } else {
      btnSend.disabled = false;
    }
  };

  function sortGames() {
    firebase.database().ref('games-d8300/').orderByChild('Game')
      .once('value', function (snapshot) {
        snapshot.forEach(gameRef => {
          let message = gameRef.val();
          renderTable(message);

        });
      })
  };

  function renderTable(message) {
    let tr = document.createElement('tr');
    tr.innerHTML = "<td>" + message.Game + "</td><td>" + message.Year + "</td><td>" + message.Manufacturer + "</td>";
    tableSort.appendChild(tr);
  }

  function sortYear() {
    firebase.database().ref('games-d8300/').orderByChild('Year')
      .once('value', function (snapshot) {
        snapshot.forEach(gameRef => {
          let message = gameRef.val();
          renderTable(message);

        });
      })
  };

  function sortMan() {
    firebase.database().ref('games-d8300/').orderByChild('Manufacturer')
      .once('value', function (snapshot) {
        snapshot.forEach(gameRef => {
          let message = gameRef.val();
          renderTable(message);

        });
      })
  };

  function numberOfAnswer() {
    let first = Number(numberInput.value);
    firebase.database().ref('games-d8300/').limitToFirst(first).once('value', function (snapshot) {
      snapshot.forEach(gameRef => {
        let message = gameRef.val();
        renderTable(message);
      })
    });
  }
   
  function numberOfAnswer2 () {
    let first = Number(numberInput.value);
    firebase.database().ref('games-d8300/').limitToLast(first).once('value', function (snapshot) {
      snapshot.forEach(gameRef => {
        let message = gameRef.val();
        renderTable(message);
      })
    });
  }







  //<<<<<<<<<<<<<<<<<<<<<<<<<<<event>>>>>>>>>>>>>>>>>>>>>>>> 
  window.addEventListener('keyup', function (event) {
    checkInput();
  });

  btnSend.addEventListener('click', function (event) {
    send();
    clear();
    table();
  });

  btnList.addEventListener('click', function (event) {
    clear();
    table();
  });

  btnSortGame.addEventListener('click', function (event) {
    tableSort.innerHTML = '';
    sortGames();
  });

  btnSortYear.addEventListener('click', function (event) {
    tableSort.innerHTML = '';
    sortYear();
  });

  btnSortMan.addEventListener('click', function (event) {
    tableSort.innerHTML = '';
    sortMan();
  });
  
  btnSortFirst.addEventListener('click', function (event){
    tableSort.innerHTML = '';
    numberOfAnswer();
  })
  
  btnSortLast.addEventListener('click', function (event){
    tableSort.innerHTML = '';
    numberOfAnswer2();
  })





};
