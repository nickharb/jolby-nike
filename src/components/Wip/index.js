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
    useSubscription,
    gql
} from "@apollo/client";

// injecting an example subscription GraphQL query here
const KNOWLEDGE_SUBSCRIPTION = gql`
    subscription {
        newKnowledgeItem {
            id
            name
            mediaLink
            modifiedAt
            itemType
            filesize
            size
            fileType
        }
    }`;

// subscribe and return
// function LatestPerson({ postID }) {
//   const { data, loading } = useSubscription(
//     PERSON_SUBSCRIPTION,
//     { variables: {  } }
//   );
  
//   return <h4>{!loading && console.log(data)}</h4>;
// }

const WIP = gql`
    query getWip{
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
    }
`;

function Wip() {

    const { loading, error, data } = useQuery(WIP);
      const { data2, loading2 } = useSubscription(
    KNOWLEDGE_SUBSCRIPTION,
            { variables: {  } }
          );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // add root class
    document.getElementById('root').classList.add('wip-root');

    // fade in content when loaded
    setTimeout(function() {
        document.getElementById('root').classList.add('loaded');
        document.body.classList.add('loaded');
    }, 2000);

    Date.prototype.today = function () { 
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return ((months[this.getMonth()]) + " " +  this.getDate() + ", " + this.getFullYear());
    }
    let wipArray = data.knowledgeItems
    // if(data2){
    //     wipArray.shift(data2.newKnowledgeItem)
    // }
    let wips = wipArray.map(function({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType }) {

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
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".blend") || mediaLink?.includes(".obj") || mediaLink?.includes(".fbx")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-render">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={renderImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>3D Render / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".numbers") || mediaLink?.includes(".xlsx")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-sheet">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={sheetImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Spreadsheet / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".sketch")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-sketch">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={sketchImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Sketch File / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".pdf")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-pdf">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={pdfImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>PDF / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".mp4")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-video">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={videoImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Video / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "file" && (mediaLink?.includes(".docx") || mediaLink?.includes(".pages")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-doc">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={docImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Document / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "miro") {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-miro">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={miroImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>Miro Board / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

   

    });
    
    // randomizes knowledge items render

    wips = shuffle(wips);

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
        gutter: 21,
        columnWidth:1
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
            <div key={1090} className="Wip content-wrapper">

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
                {wips}
            </Masonry>
            </div>
        </>
    );
}

export default Wip












