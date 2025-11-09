
import {user}from "../app/app.js"
import{LogOut} from "../lib/user.js"

export function PageSet(){

    let pageHash = window.location.hash
    pageHash = pageHash.replace("#", "")

    //If hash is empty make it home
    if(pageHash === ""){
        pageHash = "home"
    }

    //If hash is Logout execute logout
    if(pageHash === "logout"){
        LogOut()
        window.location.hash = "home"
        return
    }

    //Fill the Page
    FillPage(pageHash)

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
    let pageBody = `src/pages/${hash}.html`
    let parent = "#contentBody"
    console.log(hash)
    
    $.get(pageBody, function(data){
        //Ensure element is empty
        $(parent).empty()
        
        //Insert new Contents
        $(parent).append(data)
        
    }).fail(function(){
        $(parent).empty()
        $(parent).text(pageBody + " Not Found")

    })
}
//Set Nav Bare to match Login State
export function FillNav(type) {
    let desktop = "#linkBox_desktop"
    let mobile = "#links_mobile"

    let desktopContent = `src/pages/nav_${type}_desktop.html`
    let mobileContent = `src/pages/nav_${type}.html`

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

    let desktopContent = `src/pages/footer_${type}_desktop.html`
    let mobileContent = `src/pages/footer_${type}.html`

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
