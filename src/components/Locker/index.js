import React, { Component } from 'react';
import { Header, Nav } from '../';
import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";


const LOCKER = gql`
    query getLocker{
        knowledgeItems {
            id
            name
            mediaLink
            modifiedAt
            itemType
            filesize
            size
            fileType
        }
        projects {
            id
            name
            abbreviation
        }
    }
`;
/* function to remove an item from the locker */
function removeItem(id){
    let storage = localStorage.getItem("locker");
    if (storage?.length > 0){
        storage = storage.split(",")
        let newStorage = []
        for (var i = storage.length - 1; i >= 0; i--) {
            if(storage[i] != id){
                newStorage.push(storage[i])
            }
        }
        localStorage.setItem("locker", newStorage);
        document.querySelector("#wip-"+id).style.display = 'none'
    }
    
}
function Locker(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(LOCKER);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    Date.prototype.today = function () { 
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return ((months[this.getMonth()]) + " " +  this.getDate() + ", " + this.getFullYear());
    }

    let projects = data.projects.map(({ id, name, abbreviation }) => (
        <div key={id} className="person-projects">
            <a href={"/project/"+id}>{abbreviation}</a>
        </div>
    ));
    /* retrieve locker item ids from localstorage */
    let lockeritems = localStorage.getItem("locker")?.split(",");

    let knowledgeItems = data.knowledgeItems.map(({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType }) => (
        <>
            {( itemType == "file" && ( mediaLink?.includes(".jpeg") || mediaLink?.includes(".jpg")) && lockeritems.includes(id) ) ?
                (
                    <div key={id} id={"wip-"+id} className="wip-item">
                        <a href={"/item/"+id}>
                            <img src={mediaLink}/>
                        </a>
                        <a href={"/item/"+id}>
                            {name}
                        </a>
                        <div className="wip-meta">
                            <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                        <button onClick={() => removeItem(id)}>x</button>
                        </div>
                        
                    </div>
                ) : ""
            }
        </>
    ));

    return (
        <>
            <Header></Header>
            <Nav></Nav>
            <div className="Person Locker content-wrapper">
                <div className="person-wrapper">

                    <div className="left-panel">

                        <div className="project-columns person-section">
                            <div className="person-left">
                                <span>LC</span>
                            </div>
                            <div className="person-right">
                                <h1>Lando Calrissian</h1>
                                <h2>Baron Administrator</h2>
                                <p>Cloud City</p>
                            </div>
                        </div>

                        <div className="person-projects">
                            <h2>Projects</h2>
                            <div className="person-columns">
                                {projects}
                            </div>
                        </div>

                    </div>
                    <div className="right-panel">
                        <div className="wip-wrapper">
                            {knowledgeItems}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* Just hard-coding the Locker page */
// function Locker() {
//     return (
//         <>
//          <Header></Header>
//          <Nav></Nav>
//          <div className="Person Locker content-wrapper">
//              <div className="profile">
//                 <h1>Duncan Doughnut</h1>
//                 <p>saved projects:
//                 <br></br>Lorem ipsum dolor sin amet</p>
//              </div>
//              <div className="saved-content">
                    
//              </div>
//          </div>
//         </>
//     );
// }

export default Locker
