import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    LOGOUT_USER: "LOGOUT_USER",
    SHOW_MODAL: "SHOW_MODAL",
    HIDE_MODAL: "HIDE_MODAL",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        showModal: false,
        modalMSG: null,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    showModal: false,
                    modalMSG: null,
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    showModal: false,
                    modalMSG: null,
                })
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    showModal: false,
                    modalMSG: null,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                user: null,
                loggedIn: false,
                showModal: false,
                modalMSG: null,
                })
            }
            case AuthActionType.SHOW_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    showModal: true,
                    modalMSG: payload.modalMSG,

                })
            }
            case AuthActionType.HIDE_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    showModal: false,
                    modalMSG: null,
                })
            }
            default:
                return auth;
        }
    }

    auth.hideModal = async function (){
        console.log("HidingModal")
        authReducer({
            type: AuthActionType.HIDE_MODAL,
        });
    }
    auth.getLoggedIn = async function () {
        // console.log(auth)
        //if (auth.user){
        try{
            const response = await api.getLoggedIn();
            console.log("GET LOGGED IN CALLED AND WORKED")
            console.log(response)
            if (response.status === 200) {
                //console.log(response)
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        } catch(err){
            //console.log(err);
        }
            
        //}   
    }

    
    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);
            console.log("FAIOFOIJAIOFJIOAJ")
            console.log(response)      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                console.log("Pushing to next")
                history.push("/");
                //Need to load the right id's name pairs 
                store.loadIdNamePairs();
            }
        }catch(err){
            console.log(err.response)
            authReducer({
                type: AuthActionType.SHOW_MODAL,
                payload:{
                    modalMSG: err.response.data.errorMessage
                }
            })
            //return(err.response.data)
            // console.log("ERRORROEOROEROE")
            // console.log(response)
            //Handle the error modals here 
        }
    }

    auth.loginUser = async function(userData){
        try{
            const response = await api.loginUser(userData);
            console.log(response)
            console.log("index js loginUSer")
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
                history.push("/");
                
            }
        }catch(err){
            console.log(err.response);
            authReducer({
                type: AuthActionType.SHOW_MODAL,
                payload:{
                    modalMSG: err.response.data.errorMessage
                }
            })
        }
        
    }

    auth.logoutUser = async function(){
        try{
            console.log("Trying to logout user")
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                })
                history.push("/");
                console.log("Logging Our guy out")
            }
            
        }catch(err){

        }
    }
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };