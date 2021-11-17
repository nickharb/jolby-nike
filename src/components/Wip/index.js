import React, { Component } from 'react';
import { Header, Nav, LockerButton, ItemGrid } from '../';
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
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
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
                <div id={"wip-item-"+id} key={id} className="wip-item">
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



    return (
        <>
            <Header></Header>
            <Nav></Nav>
            <div key={1090} className="Wip content-wrapper">
                {/*<div className="wip-wrapper">
                    {wips}
                </div>*/}

                <ItemGrid>
                    {wips}
                </ItemGrid>
            </div>
        </>
    );
}

export default Wip












