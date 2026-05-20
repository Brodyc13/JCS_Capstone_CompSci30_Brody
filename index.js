

function food(name, calories, protein){
    this.name=name
    this.calories=calories
    this.protein=protein
}




document.addEventListener('DOMContentLoaded', () => {
    
    let button = document.getElementById("button");
    let button2 = document.getElementById("localstorebutton")
    let search = document.getElementById("search");
    
    button.addEventListener('click', () => {
        
        GetInput()
    });

    button2.addEventListener('click', () => {
        let storedfood = JSON.parse(localStorage.getItem("foods"));
        console.log(storedfood)
        
    });

    search.addEventListener('input',() =>{
        searchResults()
    })

});




function GetInput(){
    let calories = document.getElementById("calorieInput")
    let protein = document.getElementById("proteinInput")
    let foodName = document.getElementById("foodInput")
    

    let food3 = new food(foodName.value, calories.value, protein.value)
    console.log(food3)    

    let foods = JSON.parse(localStorage.getItem("foods")) || []//AI help
    foods.push(food3)
    localStorage.setItem("foods" ,JSON.stringify(foods))
    
}

function searchResults(){
    let searchlist = document.getElementById("searchresultlist")
    searchlist.innerHTML = "";
    let foods = JSON.parse(localStorage.getItem("foods")) || []
   
    foods.sort((a,b) =>a.name.localeCompare(b.name));//AI help
    
   let searchValue = document.getElementById("search").value.toLowerCase()
      
    for(let i =0; i <foods.length;i++){
         
        if(foods[i].name.toLowerCase().includes(searchValue)){
            let newLI = document.createElement("li");

        newLI.textContent = foods[i].name;

        searchlist.appendChild(newLI);
        }
        
        

    }
   
    



}








