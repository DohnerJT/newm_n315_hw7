
import {user}from "../app/app.js"
import{LogOut} from "../app/user.js"
import{AddRecipe, UpdateRecipe, userRecipes, defaultRecipes, setRecipeName, ViewRecipe, ViewEditRecipe} from "../app/userData.js"

export function PageSet(){

    let pageHash = window.location.hash
    pageHash = pageHash.replace("#", "")
    pageHash = pageHash.split("/")

    //If hash is empty make it home
    if(pageHash[0] === ""){
        // pageHash = "creat"
        pageHash[0] = "home"
    }

    //If hash is Logout execute logout
    if(pageHash[0] === "logout"){
        LogOut()
        window.location.hash = "home"
        return
    }

    //Fill the Page
    FillPage(pageHash[0])

    //Set Main Body Class to matching class tag
    $("body").attr("class", `page_${pageHash}`)

    //Set page Selection
    $(".selected").remove()
    let linkList = $("#linkBox_desktop").children()
    
    linkList.each(function() {
        let test = $(this).prop("tagName")
        if($(this).prop('tagName') === "A"){
            let linkAddress = $(this).attr('href')
            linkAddress = linkAddress.replace("#", "")

            if(linkAddress === pageHash)
            {
                let selected = $("<div></div>")
                selected.attr("class", "selected")

                if(linkAddress !== "login"){
                    $(this).append(selected)
                }
            }
    }
    })

    //Hide Mobile Menu
    $("#menu_mobile").hide()


}

//Fill Page
function FillPage(hash) {

    //Grab and load page contents
    let pageBody = `pages/${hash}.html`
    let parent = "#contentBody"
    // console.log(hash)
    if(hash === "my_recipe"){
        $(parent).empty()
        setUserMyRecipesPage()
        return
            }
    if(hash === "browse"){
        $(parent).empty()
        setBrowse()
        return
            }
    if(hash === "update"){
        $(parent).empty()
        window.location.hash = "my_recipe"
        return
            }

    $.get(pageBody, function(data){
        //Ensure element is empty
        $(parent).empty()
        
        //Insert new Contents
        $(parent).append(data)
        
        if(hash === "creat"){
            setUserCreatPage()
        }
        if(hash === "view"){
            ViewRecipe()
        }
        if(hash === "edit-recipe"){
            setUserEditPage()
            ViewEditRecipe()
        }
        
            

    }).fail(function(){
        $(parent).empty()
        $(parent).text(pageBody + " Not Found")

    })
}
//Set Nav Bare to match Login State
export function FillNav(type) {
    let desktop = "#linkBox_desktop"
    let mobile = "#links_mobile"

    let desktopContent = `pages/nav_${type}_desktop.html`
    let mobileContent = `pages/nav_${type}.html`

    $.get(desktopContent, function(data){
        //Ensure element is empty
        $(desktop).empty()
        
        //Insert new Contents
        $(desktop).append(data)
        
    }).fail(function(){
        console.log("failed to load " + desktopContent)

    })
    
    $.get(mobileContent, function(data){
        //Ensure element is empty
        $(mobile).empty()
        
        //Insert new Contents
        $(mobile).append(data)
        
    }).fail(function(){
        console.log("failed to load " + mobileContent)

    })
}

//Set Footer Bar to match Login State
export function FillFooter(type) {
    let desktop = "#footerLinks"
    let mobile = "#footerLinks_mobile"

    let desktopContent = `pages/footer_${type}_desktop.html`
    let mobileContent = `pages/footer_${type}.html`

    $.get(desktopContent, function(data){
        //Ensure element is empty
        $(desktop).empty()
        
        //Insert new Contents
        $(desktop).append(data)
        
    }).fail(function(){
        console.log("failed to load " + desktopContent)

    })
    
    $.get(mobileContent, function(data){
        //Ensure element is empty
        $(mobile).empty()
        
        //Insert new Contents
        $(mobile).append(data)
        
    }).fail(function(){
        // console.log("failed to load " + mobileContent)

    })
}


function setUserCreatPage() {
    let contaner = $("#contentBody")

    contaner.prepend(`<h1>Hey ${user}, create Your Recipe!</h1>`);
    
    $(".fileBtn").on("click", function () {
        console.log("file button clicked")
    });
    
    $(".addBtn").on("click", function (event) {
        let section = $(event.target).parent().prop("id");
        let newTarget = $(`#${section}`);
        let placeholder

        if(section === "in"){
            placeholder = "Ingredient"
        }else{
            placeholder = "Instruction"
        }

        let numItems = newTarget.children("input").length + 1
        let newInput = `<input type="text" name="${section}${numItems}" placeholder="${placeholder} ${numItems}"/>`
       $(`#${section} div`).before(newInput);
      
        // console.log(newInput)
    });

    $("form").on("submit", function (event) {
        
        event.preventDefault();

        let form = $(this)
        let sets = form.children("fieldset")
        
        AddRecipe(sets)

    });
  
}

function setUserEditPage() {
    let contaner = $("#contentBody")

    contaner.prepend(`<h1>Hey ${user}, edit your recipe!</h1>`);
    
    $(".fileBtn").on("click", function () {
        console.log("file button clicked")
    });
    
    $(".addBtn").on("click", function (event) {
        let section = $(event.target).parent().prop("id");
        let newTarget = $(`#${section}`);
        let placeholder

        if(section === "in"){
            placeholder = "Ingredient"
        }else{
            placeholder = "Instruction"
        }

        let numItems = newTarget.children("input").length + 1
        let newInput = `<input type="text" name="${section}${numItems}" placeholder="${placeholder} ${numItems}"/>`
       $(`#${section}`).append(newInput);
      
        // console.log(newInput)
    });

    $("form").on("submit", function (event) {
        
        event.preventDefault();

        let form = $(this)
        let sets = form.children("fieldset")

        UpdateRecipe(sets)
        console.log("Editing Recipe with data:", sets)
    

    });
  
}

function setUserMyRecipesPage() {
    let contaner = $("#contentBody")
    contaner.append(`<h1>Hey ${user}, here are your recipe!</h1>`)

    let palet = $('<div></div>')
    palet.attr("class", "recipe_palet")

    userRecipes.forEach((recipe) =>{
        let card = recipe.MakeInteractCard()
        // console.log(card)
        palet.append(card)
    })

    contaner.append(palet)

    $(".myRecipeBtn").on("click", function (e) {
        // console.log("my recipe button clicked", this.value, this.innerText)
        let action = this.innerText
        let recipeName = this.value

        if(action === "Delete"){
            //Find and remove recipe from userRecipes
            let targetIndex = null
            userRecipes.forEach((recipe, index) => {        
                if(recipe.hash === recipeName){
                    targetIndex = index
                }
            })

            if(targetIndex !== null){
                userRecipes.splice(targetIndex, 1)
            }

            window.location.hash = "update"
            return
        }else{
        setRecipeName(recipeName, action.toLowerCase().replaceAll(" ", "-"))
        }
         
    });
}

function setBrowse() {
    let contaner = $("#contentBody")
    contaner.append(`<h1>Recipes: Try some today</h1>`)

    let palet = $('<div></div>')
    palet.attr("class", "recipe_palet")

    defaultRecipes.forEach((recipe) =>{
        let card = recipe.MakeCard()
        // console.log(card)
        palet.append(card)
    })

    contaner.append(palet)
}