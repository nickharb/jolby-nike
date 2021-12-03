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

const KNOWLEDGEITEM = gql`
    query getKnowledgeItem($id: ID!) {
        knowledgeItem(id: $id) {
            id
            name
            mediaLink
            modifiedByName
            modifiedAt
            filesize
            fileType
            owner{
                id
                name
            }
        } 
    }
`;


function Item(props: MyComponentProps)  {
    const { loading, error, data } = useQuery(KNOWLEDGEITEM,{
        variables: { id: props.match.params.id }});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // add root class
    document.getElementById('root').classList.add('projects-root');

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

    return (
        <>
            <Header></Header>
            <Nav></Nav>
            <div className="Person Item content-wrapper">
                <div className="person-wrapper">

                    <div className="left-panel">

                        <div className="project-columns person-section">
                            <div className="person-left">
                                <img src={data.knowledgeItem.mediaLink}/>
                            </div>
                            <div className="person-right">
                                <h1>{data.knowledgeItem.name}</h1>
                                <h2>{data.knowledgeItem.filesize} | {data.knowledgeItem.fileType}</h2>
                            </div>
                        </div>

                        <div className="person-meta person-section">
                            <h2>File Info</h2>
                            <p>Updated: {new Date(data.knowledgeItem.modifiedAt).today()} by {data.knowledgeItem.modifiedByName}</p>
                            <p>Owner: {data.knowledgeItem.modifiedByName}</p>
                        </div>

                        
                        
                        <button className="open-file-link"><a key={data.knowledgeItem.id+2} href={data.knowledgeItem.mediaLink} target="_blank">Open file in Box</a></button>
                        

                        {/*<LockerButton id={data.knowledgeItem.id}/>*/}

                    </div>
                    <div className="right-panel">
                        <img src={data.knowledgeItem.mediaLink}/>
                    </div>
                </div>
            </div>
        </>
    );
}


// function Item(props: MyComponentProps)  {
//     const { loading, error, data } = useQuery(KNOWLEDGEITEM,{
//         variables: { id: props.match.params.id }});
//     if (loading) return <p>Loading pls wait thank you...</p>;
//     if (error) return <p>{error}</p>;
//     /*date handling*/
//     Date.prototype.today = function () { 
//         let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//             return ((months[this.getMonth()]) + " " +  this.getDate() + ", " + this.getFullYear());
//     }
//     console.log(data.knowledgeItem)

//         return (
//          <>
//          <Header></Header>
//          <Nav></Nav>
//          <div className="Person content-wrapper">
//                     <div class="left-panel">
//                         <img src={data.knowledgeItem.mediaLink}/>
//                         <div>{data.knowledgeItem.name || data.knowledgeItem.mediaLink}</div>
//                         <div>{data.knowledgeItem.filesize} | {data.knowledgeItem.fileType}</div>
//                         <div>Updated: {new Date(data.knowledgeItem.modifiedAt).today()} by {data.knowledgeItem.modifiedByName}</div>
//                         <div className="contact">
//                                 {data.knowledgeItem.owner ? data.knowledgeItem.owner.name : ""}
//                         </div>
//                     </div>
//                     <div class="right-panel">
//                             <img src={data.knowledgeItem.mediaLink}/>
//                     </div>
//             </div>
//          </>
//         );
// }

interface MyComponentProps extends RouteComponentProps {
        myField: string;
}

export default withRouter(Item)
