import React, { Component, useState } from 'react';
import { Header, Nav, LockerButton} from '../';
import Masonry from 'react-masonry-component';
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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    Date.prototype.today = function () { 
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return ((months[this.getMonth()]) + " " +  this.getDate() + ", " + this.getFullYear());
    }

    let wips = data.knowledgeItems.map(function({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType }) {
        
        if(itemType == "file" && ( mediaLink?.includes(".jpeg") || mediaLink?.includes(".jpg")) ){
           return (
                <div id={"wip-item-"+id} key={id} className={`${name.length < 30 ? "filter" : ""} wip-item`}>
                    <a key={id+1} href={"/item/"+id}>
                        <img src={mediaLink}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
     
        }
  
    });

    function filterItems(filter){
        let all = document.querySelectorAll(".wip-item");
        for (var i = all.length - 1; i >= 0; i--) {
            all[i].classList.remove("hide")
        }
        if(filter){
            let filters = document.querySelectorAll(filter);
            for (var i = filters.length - 1; i >= 0; i--) {
                filters[i].classList.add("hide")
            }
        }
    }

    const masonryOptions = {
        transitionDuration: 300,
        gutter: 20
    };




    function handleImagesLoaded() {
        console.log('images loaded');
    }

    function handleLayoutComplete(laidOutItems) {
        console.log(laidOutItems);
    }

    function handleRemoveComplete(removedItems) {
        console.log(removedItems);
    }





    return (
        <>
            <Header></Header>
            <Nav></Nav>
            <div key={1090} className="Wip content-wrapper">

            <button onClick={()=> filterItems(".filter")}>filter</button>
            <button onClick={()=> filterItems(false)}>unfilter</button>
    
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












