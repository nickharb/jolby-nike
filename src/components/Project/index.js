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
            people {
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


function Project(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(PROJECT,{
        variables: { id: props.match.params.id }});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

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
