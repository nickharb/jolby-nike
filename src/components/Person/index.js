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
import {withRouter, RouteComponentProps} from "react-router";
const PERSON_SUBSCRIPTION = gql`
subscription {
  newPerson {
    id
    name
    title
    abbreviation
    capacity
    roles
    talents
    curiosities
    teams {
        id
        name
    }
  }
}`;

const PERSON = gql`
    query getPerson($id: ID!) {
        person(id: $id) {
            id
            name
            title
            abbreviation
            capacity
            roles
            talents
            curiosities
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
            location {
                id
                name
            }
            projects {
                id
                name
                abbreviation
            }
        }
    }
`;

function Person(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(PERSON,{
        variables: { id: props.match.params.id }});
    const { data2, loading2 } = useSubscription(
        PERSON_SUBSCRIPTION,
        { variables: {  } }
      );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // add root class
    document.getElementById('root').classList.add('people-root');

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

    let projects = data.person.projects.map(({ id, name, abbreviation }) => (
        <div key={id} className="person-projects">
            <a href={"/project/"+id}>{abbreviation}</a>
        </div>
    ));

    let knowledgeItems = data.person.knowledgeItems.map(function({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType, text }) {
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
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
                    <a className="image-link" key={id+1} href={mediaLink} target="_blank">
                        <img src={commentImg}/>
                    </a>
                    <a key={id+2} href={"/item/"+id}>
                        {text}
                    </a>
                    <div className="wip-meta">
                        <p>Comment / {new Date(modifiedAt).today()}</p>
                    </div>
                  <LockerButton id={id}/>
                </div>
            )
        }

        if (itemType == "url") {
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
                  <LockerButton id={id}/>
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


    // parse roles and talents
    
    let rolesObj = JSON.parse(data.person.roles);
    let talentsObj = JSON.parse(data.person.talents);

    let roles = rolesObj.join(', ');
    let talents = talentsObj.join(', ');

    // let roles = rolesObj.map((role) => (
    //     <li>{role}</li>
    // ));

    // let talents = talentsObj.map((talent) => (
    //     <li>{talent}</li>
    // ));


    // return function

    return (
        <>
            <Header></Header>
            <Nav></Nav>
            <div className="Person content-wrapper">
                <div className="person-wrapper">

                    <div className="left-panel">

                        <div className="project-columns person-section">
                            <div className="person-left">
                                <span>{data.person.abbreviation}</span>
                            </div>
                            <div className="person-right">
                                <h1>{data.person.name}</h1>
                                <h2>{data.person.title}</h2>
                                <p>{data.person.location.name}</p>
                            </div>
                        </div>

                        <div className="person-contact person-section">
                            <h2>Contact</h2>
                            <div className="person-columns">
                                <a href="#">email</a>
                                <a href="#">phone</a>
                                <a href="#">slack</a>
                                <a href="#">other</a>
                            </div>
                        </div>

                        <div className="person-projects person-section">
                            <h2>Projects</h2>
                            <div className="person-columns">
                                {projects}
                            </div>
                        </div>

                        <div className="person-meta">
                            <h2>Roles</h2>
                            <p>{roles}</p>
                            <h2>Talents</h2>
                            <p>{talents}</p>
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

interface MyComponentProps extends RouteComponentProps {
        myField: string;
}

export default withRouter(Person)
