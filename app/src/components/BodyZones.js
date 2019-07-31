import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bodyZones.css'
import * as actionTypes from '../store/actions';
import ImageMapper from 'react-image-mapper';
import ColCharts from './ColCharts'
import BodyChart from './BodyChart'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BodyZones extends Component {

  constructor(props) {

      super(props);

        this.state = {
          zone: 'none',
          modal: false
        };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentWillMount = props => {
    this.clickTimeout = null
  }

  handleClicks = (area) => {
    if (this.clickTimeout !== null) {
      this.doubleClicked("Full Body")
      clearTimeout(this.clickTimeout)
      this.clickTimeout = null
    } else {

      this.clickTimeout = setTimeout(()=>{
      this.clicked(area)
      clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }, 2000)
    }
  }

  doubleClicked = (area) => {

    this.setState({
      zone: area
    });

    this.props.onSelectBodyZones(area);
  }

  clicked = (area) => {

    if(this.state.name === 'none') {

      this.setState({
        zone: area.name
      });

      this.props.onSelectBodyZones(area.name);
    }

    else {

      if(area.name != this.state.zone) {

        this.setState({
          zone: area.name
        });

        this.props.onSelectBodyZones(area.name);
      }

      else {
        this.setState({
          zone: 'none'
        });
      }
   }
	}

    render() {

      let img = "ImageDatabase/HumanBody/Androgynous.png";

      if(this.state.zone === 'Full Body')
        img = "ImageDatabase/HumanBody/Androgynous_fullbody.png";

      else if(this.state.zone === 'Head')
        img = "ImageDatabase/HumanBody/Androgynous_head.png";

      else if(this.state.zone === 'Chest')
        img = "ImageDatabase/HumanBody/Androgynous_chest.png";

      else if(this.state.zone === 'Back')
        img = "ImageDatabase/HumanBody/Androgynous_back.png";

      else if(this.state.zone === 'Pelvic Region')
        img = "ImageDatabase/HumanBody/Androgynous_pelvicregion.png";

      else if(this.state.zone === 'Legs')
        img = "ImageDatabase/HumanBody/Androgynous_legs.png";

      else if(this.state.zone === 'Feet')
        img = "ImageDatabase/HumanBody/Androgynous_feet.png";

      else if(this.state.zone === 'Arms')
        img = "ImageDatabase/HumanBody/Androgynous_arm.png";

      else if(this.state.zone === 'Wrist and Hand')
        img = "ImageDatabase/HumanBody/Androgynous_handnwrist.png";



        let w = window.innerWidth / 1280
        let h = window.innerHeight / 610


      let myMap = {
          name: "my-map",
          areas: [
          {name: "Head", shape: "rect", coords: [90 * w, 0 * h, 130 * w, 57 * h], fillColor: "transparent"},
          {name: "Chest", shape: "rect", coords: [80 * w, 60 * h, 110 * w, 180 * h], fillColor: "transparent"},
          {name: "Back", shape: "rect", coords: [110 * w, 60 * h, 140 * w, 180 * h], fillColor: "transparent"},
          {name: "Pelvic Region", shape: "rect", coords: [70 * w, 168 * h, 150 * w, 214 * h], fillColor: "transparent"},
          {name: "Legs", shape: "rect", coords: [70 * w, 214 * h, 150 * w, 368 * h], fillColor: "transparent"},
          {name: "Feet", shape: "rect", coords: [55 * w, 368 * h, 145 * w, 400 * h], fillColor: "transparent"},

          {name: "Arms", shape: "rect", coords: [40 * w, 67 * h, 80 * w, 174 * h], fillColor: "transparent"},
          {name: "Arms", shape: "rect", coords: [140 * w, 67 * h, 168 * w, 170 * h], fillColor: "transparent"},

          {name: "Wrist and Hand", shape: "rect", coords: [25 * w, 174 * h, 60 * w, 215 * h], fillColor: "transparent"},
          {name: "Wrist and Hand", shape: "rect", coords: [155 * w, 174 * h, 190 * w, 215 * h], fillColor: "transparent"}
          ]
      }

            const closeBtn = <Button onClick={this.toggle} color="secondary">{"Close (X)"}</Button>

            return (
             <div className="container">
                 <div style={{transform: "translate(-7%, 20%)"}}>
                       <ImageMapper src={img} map={myMap} width={250 * w} height={400 * h}
                        	onClick={area => this.handleClicks(area)}
                        />
                        <div style={{marginTop: "10%", color: "white", fontWeight: "600", fontSize: "small"}}>
                            <div>CLICK TO SELECT</div>
                            <div>BODY ZONES</div>
                        </div>
                  </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectBodyZones: (value) => dispatch({type: actionTypes.SELECT_BODYZONES, val: value}),
    }
};

export default connect(null, mapDispatchToProps)(BodyZones);