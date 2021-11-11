import React, { Component } from 'react';
import './style.css';

/* function to add an item to the locker */
function setStorage(id){
    let storage = localStorage.getItem("locker");
    if (storage?.length > 0){
        storage = storage + ","+id;
    }else{
        storage = id;
    }
    localStorage.setItem("locker", storage);
    document.querySelector("#wip-item-"+id+" .add-to-locker").innerHTML = "added"
    document.querySelector("#wip-item-"+id+" .add-to-locker").style.pointerEvents = "none"
}
/* function to check if item already exists in locker */
function checkStorage(id){
    let storage = localStorage.getItem("locker");
    let contains = false;
    if (storage?.length > 0){
        storage = storage.split(",")
        for (var i = storage.length - 1; i >= 0; i--) {
            if(storage[i] == id){
                contains = true;
            }
        }
    }
    return contains
}

function LockerButton({id}) {
    return (
        <>
                {/* only show add to locker button if item isn't already in locker*/}
                    {checkStorage(id) ?
                    <span>in locker</span>
                    : <button className="add-to-locker" onClick={() => setStorage(id)}>add to locker</button>
                   }
        </>
    )

}
export default LockerButton