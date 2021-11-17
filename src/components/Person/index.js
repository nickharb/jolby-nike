import React, { Component } from 'react';
import { Header, Nav, LockerButton } from '../';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
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
import {withRouter, RouteComponentProps} from "react-router";

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

function Person(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(PERSON,{
        variables: { id: props.match.params.id }});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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

    let knowledgeItems = data.knowledgeItems.map(({ id, mediaLink, itemType, name, modifiedAt, filesize, fileType }) => (
        <>
            {( itemType == "file" && ( mediaLink?.includes(".jpeg") || mediaLink?.includes(".jpg")) ) ?
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
                        <LockerButton id={id} />
                    </div>
                ) : ""
            }
        </>
    ));

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
                            <p>{data.person.roles}</p>
                            <h2>Talents</h2>
                            <p>{data.person.talents}</p>
                            <h2>Availability</h2>
                            <p>Unavailable until {new Date(data.person.capacity).today()}</p>
                        </div>

                    </div>
                    <div className="right-panel">
                        <div className="wip-wrapper">
                        <Masonry columns={3}>
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
