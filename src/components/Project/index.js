import React, { Component } from 'react';
import { Header, Nav, LockerButton } from '../';
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
    gql
} from "@apollo/client";
import {withRouter, RouteComponentProps} from "react-router";

const PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            subtitle
            portfolioName
            tags
            abbreviation
            knowledgeItems {
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
            people {
                id
                name
                abbreviation
            }
        }
    }
`;


function Project(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(PROJECT,{
        variables: { id: props.match.params.id }});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    console.log(data)

    Date.prototype.today = function () { 
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return ((months[this.getMonth()]) + " " +  this.getDate() + ", " + this.getFullYear());
    }

    let people = data.project.people.map(({ id, name, abbreviation }) => (
        <div key={id} className="person-project">
            <a href={"/person/"+id}>{abbreviation}</a>
        </div>
    ));

    // let knowledgeItems = data.project.knowledgeItems.map(({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType, text }) => (
    let knowledgeItems = data.project.knowledgeItems.map(function({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType, text }) {
        if (itemType == "file" && (mediaLink?.includes(".jpeg") || mediaLink?.includes(".jpg")) ) {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-image">
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
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
                        <p>{itemType} / {filesize} / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "comment") {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-comment">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={commentImg}/>
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

        if (itemType == "url") {
            return (
                <div id={"wip-item-"+id} key={id} className="wip-item filter-url">
                    <a className="image-link" key={id+1} href={"/item/"+id}>
                        <img src={urlImg}/>
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
            <div className="Person content-wrapper">
                <div className="person-wrapper">

                    <div className="left-panel">

                        <div className="project-columns person-section">
                            <div className="person-left">
                                <span>{data.project.abbreviation}</span>
                            </div>
                            <div className="person-right">
                                <h1>{data.project.name}</h1>
                                <h2>{data.project.portfolioName}</h2>
                                <p>{data.project.subtitle}</p>
                            </div>
                        </div>

                        <div className="person-projects person-section">
                            <h2>Team Members</h2>
                            <div className="person-columns">
                                {people}
                            </div>
                        </div>

                        <div className="person-meta">
                            <h2>Time / Priority</h2>
                            <p>Target completion Summer 2022</p>
                            <h2>Category</h2>
                            <p>Footwear / Innovation</p>
                            <h2>Tags</h2>
                            <p>{data.project.tags}</p>
                            
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


// function Project(props: MyComponentProps)  {
//     const { loading, error, data } = useQuery(PROJECT,{
//         variables: { id: props.match.params.id }});
//     if (loading) return <p>Loading pls wait thank you...</p>;
//     if (error) return <p>{error}</p>;

//         return (
//          <>
//          <Header></Header>
//          <Nav></Nav>
//          <div className="Project content-wrapper"> 
//                     <div class="left-panel">
//                         <div>{data.project.name}</div>
//                         <div>{data.project.portfolioName}</div>
//                         <div>{data.project.subtitle}</div>
//                         <div className="contact">
//                             {data.project.people.length}
//                         </div>
//                     </div>
//                     <div class="right-panel">
//                     </div>
//             </div>
//          </>
//         );
// }

interface MyComponentProps extends RouteComponentProps {
        myField: string;
}

export default withRouter(Project)
