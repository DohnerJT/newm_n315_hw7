
import {UserState} from "../app/app.js"
import {FillNav, FillFooter} from "../model/model.js"



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
}from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACJ4QyrgE1K9lp6LctHRgk37PPfYg8xuo",
  authDomain: "newm-n315hw7.firebaseapp.com",
  projectId: "newm-n315hw7",
  storageBucket: "newm-n315hw7.firebasestorage.app",
  messagingSenderId: "608363740845",
  appId: "1:608363740845:web:94a46dfeaff736b22c1024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

// ============================================================================================================================

export function CheckLoginState() {
    
    let user = auth.currentUser;
    if(user){return true}
    return false
    // console.log("User is as Follows\n" + user+ "\nEnd\n")
}

onAuthStateChanged(auth, (user) => {
    if(user){
        console.log("Loged In")
        UserState(user.displayName)
        FillNav("logedin")
        FillFooter("logedin")
        
    }else{
        console.log("Loged Out")
        UserState(null)
        FillNav("logedout")
        FillFooter("logedout")
    }
})

//Staring point For login
export function UserLogin() {

    let userEmail = $("input[name = 'login_email']").val()
    let userPword = $("input[name = 'login_pword']").val()

    LogIn(userEmail, userPword)
    
}

function LogIn(uEmail, uPword){
    signInWithEmailAndPassword(auth, uEmail, uPword).then(()=>{
        
        window.location.hash = "home"
    
    }).catch((e) =>{
        console.log(e)
        FailLogin(e.code)
    })
    
}


function FailLogin(){

    $("#login_Fail").show()
    $("#loginFields").css("border", "2px solid red")
}

//Staring point for Signe up
export function UserSignUp() {

    let userFname = $("input[name = 'signUp_fName']").val()
    let userlName = $("input[name = 'signUp_lName']").val()
    let userEmail = $("input[name = 'signUp_email']").val()
    let userPword = $("input[name = 'signUp_pword']").val()

    //Reset Failed Fields
    FaileReset()

    let NameCheck = CheckName(userFname, userlName)

    if(NameCheck){
        
        createUserWithEmailAndPassword(auth, userEmail, userPword).then(() => {
            UpdateUserInfo(`${userFname} ${userlName[0]}`)
            LogIn(userEmail, uPword)

        }).catch((e) =>{
            console.log("error")
            NewUserError(e.code)
            console.log("!!!End!!!")
            $("#field_fail").show()
        })
    }
    else{
        $("#field_fail").show()
    }

}

function FaileReset() {
    $("#field_fail").empty()
    $("input[name='signUp_fName']").removeAttr('style')
    $("input[name='signUp_lName']").removeAttr('style')
    $("input[name='signUp_email']").removeAttr('style')
    $("input[name='signUp_pword']").removeAttr('style')
}

function CheckName(newFirst, newLast) {
    
    let nameOK = true

    if (newFirst.length < 1) {
        nameOK = false
        NewUserFieldFail("fName", "First name is Required")
    }
    
    if (newLast.length < 1) {
        nameOK = false
        NewUserFieldFail("lName", "Last name is Required")
    }

    return nameOK
}

function UpdateUserInfo(userName) {

    console.log(userName)
    updateProfile(auth.currentUser,{
        displayName: userName
    }).catch((e) =>{

    })
}

function LookUpUser(uEmail, ePword) {

    let storedUser = {
        email: "jdoe@email.com",
        password: "Password!2"
    }

    if(storedUser.email === uEmail){
        if (storedUser.password === ePword) {
            return true
        }
        
    }
    return false
    
}

function NewUserError(eCode){

    eCode = eCode.split("/")

    switch (eCode[1]) {
        case "invalid-email":
            NewUserFieldFail("email", "Invalid Email")
            break;
        case "email-already-in-use":
            NewUserFieldFail("email", "Email is already used")
            break;
        case "missing-password":
            NewUserFieldFail("pword", "Password is Required")
            break;
        case "weak-password":
            NewUserFieldFail("pword", "Password must be 6 charectores or more")
            break;
    
        default:
            break;
    }
    console.log(eCode)
}


function NewUserFieldFail(field, msg) {

    $(`input[name="signUp_${field}"]`).css("border", "2px solid red")
    $("#field_fail").append(`<li>${msg}</li>`)
}

export function LogOut() {
    signOut(auth).then(()=>{

    }).catch((e) =>{
        console.log(e)
    })
}