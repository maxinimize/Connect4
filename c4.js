var p1 = prompt("Player One: Enter Your Name, you will be Blue")
var p2 = prompt("Player Two: Enter Your Name, you will be Red")

$("h3").text(p1+": it is your turn, please pick a column to drop your blue chip.")

$("button").on("click",play)

function play(){
  // get the column index for current cell
  var colIndex = $(this).closest("td").index()
  // var rowIndex = $(this).closest("tr").index()

  // find the row index to drop for this column
  for (var i = 0; i < $("tr").length; i++) {
    if ($("table").find("tr").eq(i).find("td").eq(colIndex).find("button").css("background-color") === "rgb(128, 128, 128)") {
      rowIndex = i
    }
  }

  // find how many cells are gray
  var grayCounter = 0
  for (var i = 0; i < $("tr").length; i++) {
    for (var j = 0; j < $("td").length; j++) {
      if ($("table").find("tr").eq(i).find("td").eq(j).find("button").css("background-color") === "rgb(128, 128, 128)") {
        grayCounter++
      }
    }
  }

  // decide the turn for players
  // for blue player1
  if (grayCounter%2 === 0) {
    $("table").find("tr").eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color","rgb(20, 100, 232)")
    $("h3").text(p2+": it is your turn, please pick a column to drop your red chip.")
  }
  // for red player2
  if (grayCounter%2 === 1) {
    $("table").find("tr").eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color","rgb(224, 8, 30)")
    $("h3").text(p1+": it is your turn, please pick a column to drop your red chip.")
  }

  // // find how many cells are blue and red
  // var blueCounter = 0
  // var redCounter = 0
  // for (var i = 0; i < $("tr").length; i++) {
  //   for (var j = 0; j < $("td").length; j++) {
  //     if ($("table").find("tr").eq(i).find("td").eq(j).find("button").css("background-color") === "rgb(20, 100, 232)") {
  //       blueCounter++
  //     }
  //     if ($("table").find("tr").eq(i).find("td").eq(j).find("button").css("background-color") === "rgb(224, 8, 30)") {
  //       redCounter++
  //     }
  //   }
  // }


  // // decide the turn for players
  // // for blue player1
  // if (blueCounter === redCounter) {
  //   $("table").find("tr").eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color","rgb(20, 100, 232)")
  //   $("h3").text(p2+": it is your turn, please pick a column to drop your red chip.")
  // }
  // // for red player2
  // if (blueCounter > redCounter) {
  //   $("table").find("tr").eq(rowIndex).find("td").eq(colIndex).find("button").css("background-color","rgb(224, 8, 30)")
  //   $("h3").text(p1+": it is your turn, please pick a column to drop your red chip.")
  // }

  endCheck()
}

function endCheck(){
  for (var i = 0; i < $("tr").length; i++) {
    for (var j = 0; j < $("td").length; j++) {
      var x = $("table").find("tr").eq(i).find("td").eq(j).find("button").css("background-color")
      // horizontal Win Check
      var h1 = $("table").find("tr").eq(i).find("td").eq(j+1).find("button").css("background-color")
      var h2 = $("table").find("tr").eq(i).find("td").eq(j+2).find("button").css("background-color")
      var h3 = $("table").find("tr").eq(i).find("td").eq(j+3).find("button").css("background-color")

      if (Object.is(x, h1) && Object.is(h1, h2) && Object.is(h2, h3)) {
        how = "horizontally"
        winnerCheck(x,i,j,how)
      }

      // vertical Win Check
      var v1 = $("table").find("tr").eq(i+1).find("td").eq(j).find("button").css("background-color")
      var v2 = $("table").find("tr").eq(i+2).find("td").eq(j).find("button").css("background-color")
      var v3 = $("table").find("tr").eq(i+3).find("td").eq(j).find("button").css("background-color")

      if (Object.is(x, v1) && Object.is(v1, v2) && Object.is(v2, v3)) {
        how = "vertically"
        winnerCheck(x,i,j,how)
      }

      //diagonal down Win Check
      var dd1 = $("table").find("tr").eq(i+1).find("td").eq(j+1).find("button").css("background-color")
      var dd2 = $("table").find("tr").eq(i+2).find("td").eq(j+2).find("button").css("background-color")
      var dd3 = $("table").find("tr").eq(i+3).find("td").eq(j+3).find("button").css("background-color")

      if (Object.is(x, dd1) && Object.is(dd1, dd2) && Object.is(dd2, dd3)) {
        how = "diagonally"
        winnerCheck(x,i,j,how)
      }

      //diagonal up Win Check
      var du1 = $("table").find("tr").eq(i-1).find("td").eq(j+1).find("button").css("background-color")
      var du2 = $("table").find("tr").eq(i-2).find("td").eq(j+2).find("button").css("background-color")
      var du3 = $("table").find("tr").eq(i-3).find("td").eq(j+3).find("button").css("background-color")

      if (Object.is(x, du1) && Object.is(du1, du2) && Object.is(du2, du3)) {
        how = "diagonally"
        winnerCheck(x,i,j,how)
      }
    }
  }
}

function winnerCheck(x,i,j,how){
  // blue player1 wins
  if (x === "rgb(20, 100, 232)") {
    console.log(p1+" has won "+how+" starting at row "+(i+1)+" col "+(j+1));
    $("h3").fadeOut("fast");
    $("h2").fadeOut("fast");
    $("h1").text(p1+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    // off click event
    $("button").off("click",play)
  }

  // red player1 wins
  if (x === "rgb(224, 8, 30)") {
    console.log(p2+" has won "+how+" starting at row "+(i+1)+" col "+(j+1));
    $("h3").fadeOut("fast");
    $("h2").fadeOut("fast");
    $("h1").text(p2+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    // off click event
    $("button").off("click",play)
  }
}
