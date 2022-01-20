import React, { Component, useState } from 'react';
import { Header, Nav, LockerButton} from '../';
import Masonry from 'react-masonry-component';
import './style.css';

import docImg from './img/doc.svg';
import miroImg from './img/miro.svg';
import pdfImg from './img/pdf.svg';
import renderImg from './img/render.svg';
import sheetImg from './img/sheet.svg';
import sketchImg from './img/sketch.svg';
import videoImg from './img/video.svg';
import commentImg from './img/comment.svg';
import urlImg from './img/url.svg';
import closeImg from './img/close.svg';

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
        knowledgeItems(limit: 500) {
            id
            name
            mediaLink
            modifiedAt
            itemType
            filesize
            size
            fileType
            text
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
        // document.querySelector("#wip-item-"+id).style.display = 'none';
        document.querySelector("#wip-item-"+id).classList.add("hide");
    }
}

// function filterItems(filter){
//         let all = document.querySelectorAll(".wip-item");
        
//         for (var i = all.length - 1; i >= 0; i--) {
//             all[i].classList.add("hide")
//         }
        
//         if (filter) {
//             let filters = document.querySelectorAll(filter);
//             for (var i = filters.length - 1; i >= 0; i--) {
//                 filters[i].classList.remove("hide")
//             }
//         }
//     }

function Locker(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(LOCKER);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // add root class
    document.getElementById('root').classList.add('locker-root');

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 1000);

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

    let knowledgeItems = data.knowledgeItems.map(function({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType, thumbnailLink, text }) {
        if (lockeritems?.includes(id)) {
            if (itemType == "file" && (mediaLink?.includes(".jpeg") || mediaLink?.includes(".jpg")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className={`filter-image wip-item`}>
                    <a key={id+1} href={"/item/"+id}>
                        <img src={mediaLink}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Image / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>
 
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".blend") || mediaLink?.includes(".obj") || mediaLink?.includes(".fbx")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-render">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={renderImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>3D Render / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>

                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".numbers") || mediaLink?.includes(".xlsx")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-sheet">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={sheetImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Spreadsheet / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>
            
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".sketch")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-sketch">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={sketchImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Sketch File / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>
                  
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".pdf")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-pdf">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={pdfImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>PDF / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>

                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".mp4")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-video">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={videoImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Video / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>
            
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".docx") || mediaLink?.includes(".pages")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-doc">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={docImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Document / {filesize} / {new Date(modifiedAt).today()}</p>
                                                <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>
                  
                </div>
            )
        }

        if (itemType == "miro") {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-miro">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={thumbnailLink}/>
                        {/*<img src={miroImg}/>*/}
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Miro Board / {new Date(modifiedAt).today()}</p>
                        <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>

                    </div>
                </div>
            )
        }


           

        }

        if (itemType == "file" && (mediaLink?.includes(".blend") || mediaLink?.includes(".obj") || mediaLink?.includes(".fbx")) && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-render">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={renderImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".numbers") || mediaLink?.includes(".xlsx")) && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-sheet">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={sheetImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".sketch")) && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-sketch">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={sketchImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".pdf")) && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-pdf">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={pdfImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".mp4")) && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-video">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={videoImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".docx") || mediaLink?.includes(".pages")) && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-doc">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={docImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "miro" && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-miro">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={miroImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "comment" && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-comment">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={commentImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {text}
                    </a>
                    <div className="wip-meta">
                        <p>Comment / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }

        if (itemType == "url" && lockeritems?.includes(id)) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-url">
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={urlImg}/>
                    </a>
                    <a key={id+2} href={mediaLink} target="_blank">
                        {mediaLink}
                    </a>
                    <div className="wip-meta">
                        <p>URL / {new Date(modifiedAt).today()}</p>
                    </div>
                  <button className="add-to-locker" onClick={() => removeItem(id)}><img src={closeImg}/></button>
                </div>
            )
        }
    });


    // randomizes knowledge items render

    knowledgeItems = shuffle(knowledgeItems);

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function filterItems(filter){
        let all = document.querySelectorAll(".wip-item");
        
        for (var i = all.length - 1; i >= 0; i--) {
            all[i].classList.add("hide")
        }
        
        if (filter) {
            let filters = document.querySelectorAll(filter);
            for (var i = filters.length - 1; i >= 0; i--) {
                filters[i].classList.remove("hide")
            }
        }
    }

    function showAll(){
        let all = document.querySelectorAll(".wip-item");
        
        for (var i = all.length - 1; i >= 0; i--) {
            all[i].classList.remove("hide")
        }
    }

    const masonryOptions = {
        transitionDuration: 300,
        gutter: 20,
        columnWidth: 230
    };




    function handleImagesLoaded() {
        console.log('images loaded');
    }

    function handleLayoutComplete(laidOutItems) {
        // console.log(laidOutItems);
    }

    function handleRemoveComplete(removedItems) {
        // console.log(removedItems);
    }


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
                            

                            <div className="filters">
                                <button onClick={()=> showAll()}>show all</button>
                                <button onClick={()=> filterItems(".filter-image")}>images</button>
                                <button onClick={()=> filterItems(".filter-miro")}>miro boards</button>
                                <button onClick={()=> filterItems(".filter-doc")}>documents</button>
                                <button onClick={()=> filterItems(".filter-sheet")}>spreadsheets</button>
                                {/*<button onClick={()=> filterItems(".filter-pdf")}>PDF</button>
                                <button onClick={()=> filterItems(".filter-sketch")}>sketch files</button>
                                <button onClick={()=> filterItems(".filter-video")}>videos</button>
                                <button onClick={()=> filterItems(".filter-render")}>3d renders</button>*/}
                            </div>
                            
                    
                            <Masonry
                                // ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                                ref={function(c) {console.log(c)}.bind(this)}
                                className={'my-gallery-class'} // default ''
                                elementType={'div'} // default 'div'
                                options={masonryOptions} // default {}
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                                onImagesLoaded={handleImagesLoaded()}
                                enableResizableChildren={true}
                                onLayoutComplete={laidOutItems => handleLayoutComplete(laidOutItems)}
                                onRemoveComplete={removedItems => handleRemoveComplete(removedItems)}
                            >
                                {knowledgeItems}
                            </Masonry>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Locker
