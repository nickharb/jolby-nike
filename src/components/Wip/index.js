import React, { Component } from 'react';
import { Header, Nav, LockerButton } from '../';
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

    let wips = data.knowledgeItems.map(({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType }) => (
        <>
        {(itemType == "file" && ( mediaLink?.includes(".jpeg") || mediaLink?.includes(".jpg")) ) ?
            (
                <div id={"wip-item-"+id} key={id} className="wip-item">
                    <a href={"/item/"+id}>
                        <img src={mediaLink}/>
                    </a>
                    <a href={"/item/"+id}>
                        {name}
                    </a>
                    <div className="wip-meta">
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
         : ""
        }
        </>
    ));



    return (
        <>
            <Header></Header>
            <Nav></Nav>
            <div className="Wip content-wrapper">
                <div className="wip-wrapper">
                    {wips}
                </div>
            </div>
        </>
    );
}

export default Wip












