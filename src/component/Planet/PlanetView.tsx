import React from 'react';
import { Planet } from '../../contract/planet';
import Donlon from '../../images/Donlon.png'
import Enchai from '../../images/Enchai.png'
import Jebing from '../../images/Jebing.png'
import Sapir from '../../images/Sapir.png'
import Lerbin from '../../images/Lerbin.png'
import Pingasor from '../../images/Pingasor.png'
import { styles } from '../../style/Style';

const Images = [Donlon, Enchai, Jebing, Sapir, Lerbin, Pingasor]

interface IPlanetViewProps {
    planetData: Planet;
}

interface IPlanetViewStates {
}


export class PlanetView extends React.Component<IPlanetViewProps, IPlanetViewStates> {

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <React.Fragment>
                <div id={`planetViewContainer${this.props.planetData.id}`} className="layout-column layout-align-center-center">
                    <img  id={`planetViewImage${this.props.planetData.id}`} style={styles.planetViewImage} src={Images[this.props.planetData.id]}></img>
                    <span id={`planetViewName${this.props.planetData.id}`} style={styles.planetViewName}>{this.props.planetData.name}</span>
                    <div style={styles.planetDistanceBody} className="layout-row">
                        <span style={styles.planetViewDistance}>{`Distance -`}&nbsp;</span>
                        <span id={`planetViewDistance${this.props.planetData.id}`}>{`${this.props.planetData.distance} megamiles`}</span>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default PlanetView;