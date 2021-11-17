import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Isotope from 'isotope-layout';
import './style.css';


// Container for isotope grid
class ItemGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { isotope: null };
    }

    render() {
        return(
            <div className="item-grid">
                {this.props.children}
            </div>
        )
    }

    // set up isotope
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        if (!this.state.isotope) {
            this.setState({
                isotope: new Isotope( node )
            });
        } else {
            this.state.isotope.reloadItems();
        }
    }

    // update isotope layout
    componentDidUpdate() {
        if (this.state.isotope) {
            this.state.isotope.reloadItems();
            this.state.isotope.layout();
        }
    }
}

export default ItemGrid;