let caloriesEaten = 0;
let proteinEaten = 0

function food(name, calories, protein) {
  this.name = name;
  this.calories = calories;
  this.protein = protein;
}

document.addEventListener("DOMContentLoaded", () => {
  let button = document.getElementById("button");
  let search = document.getElementById("search");
  let button2 = document.getElementById("button2");

  button.addEventListener("click", () => {
    newFoodInput();
  });

  search.addEventListener("input", () => {
    searchResults();
  });

  button2.addEventListener("click", () => {
    GoalInput();
  });
});

function newFoodInput() {
  let calories = document.getElementById("calorieInput");
  let protein = document.getElementById("proteinInput");
  let foodName = document.getElementById("foodInput");

  let food3 = new food(foodName.value, calories.value, protein.value);
  console.log(food3);

  let foods = JSON.parse(localStorage.getItem("foods")) || []; //AI help
  foods.push(food3);
  localStorage.setItem("foods", JSON.stringify(foods));
}

function searchResults() {
  let searchlist = document.getElementById("searchresultlist");
  searchlist.innerHTML = "";
  let foods = JSON.parse(localStorage.getItem("foods")) || [];

  foods.sort((a, b) => a.name.localeCompare(b.name)); //AI help

  let searchValue = document.getElementById("search").value.toLowerCase();

  for (let i = 0; i < foods.length; i++) {
    if (foods[i].name.toLowerCase().includes(searchValue)) {
      let newLI = document.createElement("li");

      newLI.textContent = foods[i].name;


      function createDeleteButton() {
        let deletebutton = document.createElement("button");
        deletebutton.textContent = "delete";
        deletebutton.addEventListener("click", () => {
          let foods = JSON.parse(localStorage.foods);

          searchlist.removeChild(newLI);
          
          foods.splice(i, 1);

          localStorage.setItem("foods", JSON.stringify(foods));
          console.log(foods);
        });

        deletebutton.setAttribute("style", "opacity:0");
        newLI.appendChild(deletebutton);

        newLI.addEventListener("mouseover", () => {
          deletebutton.setAttribute("style", "opacity:1");
        });
        newLI.addEventListener("mouseout", () => {
          deletebutton.setAttribute("style", "opacity:0");
        });
      }

      function createAddButton() {
        let addButton = document.createElement("button");
        addButton.textContent = "add New Food";

        addButton.addEventListener("click", () => {
          let foods = JSON.parse(localStorage.foods);
          let caloriesofFood = Number(foods[i].calories)
          let proteinofFood = Number(foods[i].protein)
          caloriesEaten += caloriesofFood
          proteinEaten += proteinofFood

          

         ctxChart.data.datasets[0].data = [caloriesEaten, (Number(localStorage.getItem("calorie goal")) - caloriesEaten)]
         ctxChart2.data.datasets[0].data = [proteinEaten, (Number(localStorage.getItem("protein goal")) - proteinEaten)]
         ctxChart.update()
         ctxChart2.update()
          
      })

      newLI.appendChild(addButton)
    }
      createDeleteButton();
      createAddButton();

      searchlist.appendChild(newLI);
    }
  }
}

function GoalInput() {
  let proteingoal = document.getElementById("proteingoal").value;
  let caloriegoal = document.getElementById("caloriegoal").value;

  localStorage.setItem("protein goal", proteingoal);
  localStorage.setItem("calorie goal", caloriegoal);
  console.log(localStorage);
}

let ctx = document.getElementsByClassName("caloriesClass");

let ctx2 = document.getElementsByClassName("proteinClass");

let ctxChart = new Chart(ctx, {
  type: "pie",
  data: {
    datasets: [
      {
        data: [caloriesEaten, Number(localStorage.getItem("calorie goal"))-caloriesEaten],
        backgroundColor: ["cornflowerblue", "#201f1f"],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

let ctxChart2 =new Chart(ctx2, {
  type: "pie",
  data: {
    datasets: [
      {
        data: [proteinEaten, Number(localStorage.getItem("protein goal"))-proteinEaten],
        backgroundColor: ["cornflowerblue", "#201f1f"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
});

