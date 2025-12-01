
let baseRecipe = [
    {
        image: "images/recipe-pizza.jpg",
        name: "supreme pizza",
        description: "Make pizza night super duper out of this world with homemade pizza. This recipe is supreme with vegetables and two types of meat. Yum!",
        details: {
            time: "1h 24min",
            servings: "4 servings",
        },

        ingredients: {
            in1: "1/4 batch pizza dough",
            in2: "2 tablespoons Last-Minute Pizza Sauce",
            in3: "10 slices pepperoni",
            in4: "1 cup cooked and crumbled Italian sausage",
            in5: "2 large mushrooms, sliced",
            in6: "1/4 bell pepper, sliced",
            in7: "1 tablespoon sliced black olives",
            in8: "1 cup shredded mozzarella cheese"
        },

        instructions:{
            step1:" Preheat the oven to 475°. Spray pizza pan with nonstick cooking or line a baking sheet with parchment paper.",
            step2: "Flatten dough into a thin round and place on the pizza pan.",
            step3: "Spread pizza sauce over the dough.",
            step4: "Layer the toppings over the dough in the order listed .",
            step5: "Bake for 8 to 10 minutes or until the crust is crisp and the cheese melted and lightly browned.",
        }
    },
    {
        image: "images/recipe-burger.jpg",
        name: "Classic Burger",
        description: "Sink your teeth into a delicious restaurant-style, hamburger recipe made from lean beef. Skip the prepackaged patties and take the extra time to craft up your own, and that little extra effort will be worth it.",
        details: {
            time: "30 min",
            servings: "4 servings",
        },

        ingredients: {
            in1: null
        },

        instructions:{
            step1:null
        }
    },
    {
        image: "images/recipe-pilaf.jpg",
        name: "Chicken Biryani",
        description: "Chicken Biryani is a bold and flavorful Indian dish with crazy tender bites of chicken with bell peppers in a deliciously spiced and fragrant rice.",
        details: {
            time: "1h 15min",
            servings: "6 servings",
        },

        ingredients: {
            in1: null
        },

        instructions:{
            step1:null
        }
    },
    {
        image: "images/recipe-chowmein.jpg",
        name: "Ch. Chow Mein",
        description: "A great Chow Mein comes down to the sauce - it takes more than just soy sauce and sugar! Jam packed with a surprising amount of hidden vegetables, customize this Chicken Chow Mein recipe using your protein of choice!",
        details: {
            time: "20 min",
            servings: "4 servings",
        },

        ingredients: {
            in1: null
        },

        instructions:{
            step1:null
        }
    }
]

export let userRecipes = []
export let defaultRecipes = []

let activeRecipe = null

export function AddBaseRecipes(){

    baseRecipe.forEach(recipe => {
        const newRecipe = new Recipe()
        newRecipe.setImage(recipe.image)
        newRecipe.setName(recipe.name)
        newRecipe.setHash(recipe.name.toLowerCase().replaceAll(" ", "-"))
        newRecipe.setDescription(recipe.description)
        newRecipe.setDetails(recipe.details)
        newRecipe.setIngredients(recipe.ingredients)
        newRecipe.setInstructions(recipe.instructions)  
        defaultRecipes.push(newRecipe)
    });

    const firstRecipe = new Recipe()
    firstRecipe.setImage(baseRecipe[0].image)
    firstRecipe.setName(baseRecipe[0].name)
    firstRecipe.setHash(baseRecipe[0].name.toLowerCase().replaceAll(" ", "-"))
    firstRecipe.setDescription(baseRecipe[0].description)
    firstRecipe.setDetails(baseRecipe[0].details)
    firstRecipe.setIngredients(baseRecipe[0].ingredients)
    firstRecipe.setInstructions(baseRecipe[0].instructions)  
    userRecipes.push(firstRecipe)

    // console.log("Base Recipes Added", defaultRecipes)
    // console.log("User Recipes Added", userRecipes)  

}

export function AddRecipe(baseRecipe){

    const newRecipe = new Recipe()
    
    const descriptionSet = $(baseRecipe[0]).children("input")
    const ingredientSet = $(baseRecipe[1]).children("input")
    const instructionSet = $(baseRecipe[2]).children("input")
    

    // console.log(baseRecipe)
    // console.log(descriptionSet)
    
    //Get Description Data
    newRecipe.setImage(CheckSetNull(descriptionSet[0].value))
    newRecipe.setName(CheckSetNull(descriptionSet[1].value))
    newRecipe.setHash(CheckSetNull(descriptionSet[1].value.toLowerCase().replaceAll(" ", "-")))
    newRecipe.setDescription(CheckSetNull(descriptionSet[2].value))

    const details = {
        time: CheckSetNull(descriptionSet[3].value),
        servings: CheckSetNull(descriptionSet[4].value)
    }

    newRecipe.setDetails(details)
    // console.log(newRecipe)

    //Parse Ingredients
    let ingredients = {}
    let num = 1
    ingredientSet.each(function() {
        if(this.value !== ""){
            ingredients[`in${num}`] = this.value
            num++
        }
        // ingredients[this.name] = this.value
    });
    newRecipe.setIngredients(ingredients)


    //Parse Instructions
    let instructions = {}
    num = 1
    instructionSet.each(function() {
        if(this.value !== ""){
            instructions[`step${num}`] = this.value
            num++
        }
    });
    newRecipe.setInstructions(instructions)

    userRecipes.push(newRecipe)
    window.location.hash = "my_recipe"
    // console.log(newRecipe)
}

export function UpdateRecipe(baseRecipe){

    const descriptionSet = $(baseRecipe[0]).children("input")
    const ingredientSet = $(baseRecipe[1]).children("input")
    const instructionSet = $(baseRecipe[2]).children("input")

    const details = {
        time: CheckSetNull(descriptionSet[3].value),
        servings: CheckSetNull(descriptionSet[4].value)
    }

    userRecipes.forEach((recipe) => {

        recipe.setDetails(details)

        //Parse Ingredients
        let ingredients = {}
        let num = 1
        ingredientSet.each(function() {
            if(this.value !== ""){
                ingredients[`in${num}`] = this.value
                num++
            }
            // ingredients[this.name] = this.value
        });
        recipe.setIngredients(ingredients)


        //Parse Instructions
        let instructions = {}
        num = 1
        instructionSet.each(function() {
            if(this.value !== ""){
                instructions[`step${num}`] = this.value
                num++
            }
        });
        recipe.setInstructions(instructions)

    })

        window.location.hash = "my_recipe"
        console.log("Recipe Updated", userRecipes)

}

export function setRecipeName(activate, set) {
    activeRecipe = activate
    window.location.hash = `#${set}`
}

export function ViewRecipe() {
    userRecipes.forEach((recipe) => {
        if(recipe.name === activeRecipe){
            console.log("Viewing Recipe:", recipe)
            recipe.FillSheet()

            $(".myRecipeBtn").on("click", function (e) {
                // console.log("my recipe button clicked", this.value, this.innerText)
                let action = this.innerText
                let recipeName = this.value

                setRecipeName(recipeName, action.toLowerCase().replaceAll(" ", "-"))
            
            });
            return
        }})
    
}  

export function ViewEditRecipe() {
    userRecipes.forEach((recipe) => {
        if(recipe.name === activeRecipe){
            recipe.FillEdit()
            return
        }})
}

function CheckSetNull(value) {
    if (value === null || value === undefined || value === "") {
        return null
    }
    return value
}

class Recipe{

    constructor( ){
       
        this.image = null
        this.name = null
        this.hash = null
        this.description = null
        this.details = null
        this.ingredients = null
        this.instructions = null
    }
   
    //Setters
    setImage(params) {
        this.image = params
    }

    setName(params) {
        this.name = params
    }

    setHash(params) {
        this.hash = params
    }

    setDescription(params) {
        this.description = params
    }

    setDetails(params) {
        this.details = params
    }

    setIngredients(params) {
        this.ingredients = params
    }
    
    setInstructions(params) {
        this.instructions = params
    }

    //Getters
    getName() {
        return this.name
    }   

    getDescription() {
        return this.description
    }   

    getDetails() {
        return this.details
    }   

    getIngredients() {
        return this.ingredients
    }  

    getInstructions() {
        return this.instructions
    }

    MakeCard(){
        let card = `<div class="recipe_card" >
                        <div class="recipe_img" style="background-image: url('${this.image}');"></div>
                        <div class="recipe_info">
                            <h2>${this.name}</h2>
                            <p>${this.description}</p>
                            <div class="recipe_time">
                                <img src="images/icon/time.svg" alt="clock icon">
                                <span>${this.details.time}</span>
                            </div>
                            <div class="recipe_serv">
                                <img src="images/icon/servings.svg" alt="clock icon">
                                <span>${this.details.servings}</span>
                            </div>
                        </div>
                    </div>`
        
        
        return card
    }

    MakeInteractCard(){
        let card = `<div class="recipe_card_interact">
        
                        <div class="recipe_block">
                            <div class="recipe_img" style="background-image: url('${this.image}');">
                            <button class="myRecipeBtn" value="${this.name}">View</button>
                        </div>
                        
                        <div class="recipe_info">
                            <h2>${this.name}</h2>
                            <p>${this.description}</p>
                            <div class="recipe_time">
                                <img src="images/icon/time.svg" alt="clock icon">
                                <span>${this.details.time}</span>
                            </div>
                            <div class="recipe_serv">
                                <img src="images/icon/servings.svg" alt="clock icon">
                                <span>${this.details.servings}</span>
                            </div>
                        </div>

                        </div>

                        <div class="btnBar">
                            <button class="myRecipeBtn" value="${this.name}">Edit Recipe</button>
                            <button class="myRecipeBtn" value="${this.name}">Delete</button>
                        </div>
                </div>`

                return card 
    }

    FillSheet(){
        //Add title
        $(".view_titleBar").text(this.name)

        //Add Image
        if(this.image.includes("http") || this.image.includes("data:image")){
            $(".view_titleImg").css("background-image", `url('${this.image}')`)
            
        }else{
            $(".view_titleImg").css("background-image", `url('../${this.image}')`)
        }

        //Add Description
        $(".descriptionSection").text(this.description)

        //Add Details
        $(".time").text(this.details.time)
        $(".serving").text(this.details.servings)

        //add Ingredients
        let ingList = $(".ingredientsCard")
        ingList.empty() 

        for (const key in this.ingredients) {
            if (this.ingredients[key] !== null) {
                let listItem = `<ul>${this.ingredients[key]}</ul>`;
                ingList.append(listItem);
            }
        }

        //add Instructions
        let instList = $(".instructionsCard")
        instList.empty() 
        
        for (const key in this.instructions) {
            if (this.instructions[key] !== null) {
                let listItem = `<li>${this.instructions[key]}</li>`;
                instList.append(listItem);
            }       
        }

        let buttonBar = $(".myRecipeBtn")
        buttonBar.val(this.name)
    }

    FillEdit(){
        $("input[name = 'file']").val(this.image);
        $("input[name = 'name']").val(this.name);
        $("input[name = 'description']").val(this.description);
        $("input[name = 'time']").val(this.details.time);
        $("input[name = 'size']").val(this.details.servings);

        let ingList = $("#in")
        let num = 1

        for (const key in this.ingredients) {
            if (this.ingredients[key] !== null) {
                let listItem = `<input type="text" name="${key}" placeholder="Ingredient ${num}" value="${this.ingredients[key]}"/>`;
                ingList.append(listItem);
                num++
            }
        }

        let instList = $("#step")
        num = 1

        for (const key in this.instructions) {
            if (this.instructions[key] !== null) {
                let listItem = `<input type="text" name="${key}" placeholder="Instruction ${num}" value="${this.instructions[key]}"/>`;
                instList.append(listItem);
                num++
            }
        }

    }
}
