import React from 'react';
import { Chip } from '@material-ui/core';
import Langaburu from '../images/Langaburu.png'
import { styles } from '../style/Style';

interface IWelcomeProps {
    routePlanetSelection: Function,
}

interface IWelcomeStates {
}


export class Welcome extends React.Component<IWelcomeProps, IWelcomeStates> {

    constructor(props: any) {
        super(props)

    }

    routePlanetSelection = () => {
        this.props.routePlanetSelection()
    }

    render() {
        return (
            <React.Fragment>
                <div id="welcomeContainer" className="flex-70 layout-row layout-space-around-stretch">
                    <div style={styles.welcomePage} className="layout-column layout-align-space-around-center">
                        <img id="welcomeContainerLangaburuImage" style={styles.image} src={Langaburu} />
                        <span id="welcomeContainerHeader" style={styles.pageHeading}>{`Welcome to the planet of Lengaburu`}</span>
                        <p id="welcomeContainerBody1" style={styles.pageBody}>{`After the recent war with neighbouring planet Falicornia, King Shan has exiled the Queen of Falicornia for 15 years. Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she will be exiled for another 15 years....`}</p>
                        <p id="welcomeContainerBody2" style={styles.pageBody}>{`King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. However he has limited resources at his disposal & can send his army to only 4 of these planets. Your task is to help King Shan find Al Falcone.`}</p>
                        <Chip id="welcomeFindFalconeButton"
                            label={`Help King Shan finding AI Falcone`}
                            style={styles.welcomeButtonChip}
                            onClick={this.routePlanetSelection}
                        />
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default Welcome;