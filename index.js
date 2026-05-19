function food(name, calories, protein){
    this.name=name
    this.calories=calories
    this.protein=protein
}




document.addEventListener('DOMContentLoaded', () => {
    
    let button = document.getElementById("button");
    let button2 = document.getElementById("localstorebutton")
    
    button.addEventListener('click', () => {
        
        GetInput()
    });

    button2.addEventListener('click', () => {
        let storedfood = JSON.parse(localStorage.getItem("ilovefood"));
        console.log(storedfood)
        
    });

});




function GetInput(){
    let calories = document.getElementById("calorieInput")
    let protein = document.getElementById("proteinInput")
    let foodName = document.getElementById("foodInput")
    

    let food3 = new food(foodName.value, calories.value, protein.value)
    console.log(food3)    

    localStorage.setItem("ilovefood", JSON.stringify(food3))

    console.log(localStorage.getItem("ilovefood"))
}








