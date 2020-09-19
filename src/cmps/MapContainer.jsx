import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { MarkunreadSharp } from "@material-ui/icons";

const mapStyles = {
  width: "370px",
  height: "300px",
};

export class MapContainer extends Component {
  state = {
    pos: null,
  };

  componentDidMount() {
    this.setState(this.props.pos);
  }

  render() {
    const { pos } = this.props;
    if (!pos) return <h1>Loading...</h1>;
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={pos}
        />

       
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCTwmmUbksAqfSEKLn9fR4oSVbBimBrXvk",
})(MapContainer);
