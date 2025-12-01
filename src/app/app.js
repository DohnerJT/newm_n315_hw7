import "../scss/styles.scss"
import {PageSet, FillNav, FillFooter} from "../model/model.js"
import {UserLogin, UserSignUp, LogOut, CheckLoginState} from "../app/user.js"
import {AddBaseRecipes} from "../app/userData.js"


//Holds the loged in Users information
//Will be null when no user is loged in
export let user = null



function initListeners() {
    
    console.log("app.js is linked")
    $(window).on("hashchange", function(){
        PageSet()
    })

    //SHow and Hide Mobile Menu
    $("#linkBox_mobil").on("click", function(){
        $("#menu_mobile").toggle()
    })

    $("a").on("click", function(){
        $("#menu_mobile").hide()
    })

    //Login and Signe up buttons. 
    $("#contentBody").on("click", "#login_btn", UserLogin)
    
    $("#contentBody").on("click", "#signUp_btn", UserSignUp)
    
}

export function UserState(userIn) {
    user = userIn
    
}

$(document).ready(function () {
    
    AddBaseRecipes()

    
    //Inital Seting of nav and footer
    let state
    if(user){
        state = "logedin"
    }else{
        state = "logedout"
    }
    FillNav(state)
    FillFooter(state)

    PageSet()
    initListeners();
})