import React from 'react';
import { Chip, CircularProgress, Card } from '@material-ui/core';
import FindFalconeService from '../../service/FindFalconeService';
import { Planet } from '../../contract/planet';
import { styles } from '../../style/Style';
import PlanetCard from './PlanetCard';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

interface IPlanetSelectionProps {
    goToVehicleSelection: Function,
    goToHome: Function,
}

interface IPlanetSelectionStates {
    planets: Planet[]
    isBusy: boolean
    error: boolean
}

export class PlanetSelection extends React.Component<IPlanetSelectionProps, IPlanetSelectionStates> {

    constructor(props: any) {
        super(props)
        this.state = { planets: [], isBusy: true, error: false }
    }

    goToHome = () => {
        this.props.goToHome()
    }

    preparePlanetData = (planetData: Planet[]) => {
        planetData.forEach((planet, index) => {
            planet.id = index
            planet.isSelected = false
            planet.selectedVehicleId = -1
        })
        this.setState({ planets: planetData, isBusy: false })

    }

    onCardSelect = (planetId: number) => {
        let allPlanets = this.state.planets

        if (allPlanets[planetId].isSelected) {
            allPlanets[planetId].isSelected = false
        } else {
            let noOfSelectedPlanets = this.getSelectedPlanetsCount()
            if (noOfSelectedPlanets < 4) {
                allPlanets[planetId].isSelected = true
            }
        }

        this.setState({ planets: allPlanets })
    }

    getSelectedPlanetsCount = () => {
        return this.state.planets.filter(planet => planet.isSelected).length
    }

    getPlanetsCard = () => {
        return this.state.planets.map((planet, index) =>
            (
                <PlanetCard
                    key={index}
                    planetData={planet}
                    onCardSelect={this.onCardSelect}
                />
            ))
    }

    goToVehicleSelection = () => {
        this.props.goToVehicleSelection(this.state.planets)
    }

    componentDidMount = () => {
        FindFalconeService.getPlanets()
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                this.preparePlanetData(myJson)
            }).
            catch((error: any) => {
                this.setState({ error: true })
            });
    }

    render() {
        let spinner = (
            <div id="planetSelectionSpinner" className="layout-column layout-align-center-center" style={styles.spinnerContainer}>
                <CircularProgress style={styles.isBusy} />
                <span id="planetSelectionSpinnerText" style={styles.spinnerLabel}>{`Reaching Space...`}</span>
            </div>
        )

        let errorMessage = (
            <div id="planetSelectionErrorMessage" className="layout-column layout-align-center-center">
                <Card style={styles.errorMessageCard}>
                    <div className="layout-row layout-align-space-around-center">
                        <ErrorIcon style={styles.errorMessageIcon} />
                        <p id="planetSelectionErrorMessageText" style={styles.errorMessage}>{`Something went wrong, Please start again.`}</p>
                    </div>
                </Card>
                <Chip
                    label={`Start Again`}
                    style={styles.welcomeButtonChip}
                    onClick={this.goToHome}
                />
            </div>
        )

        let planets = this.getPlanetsCard()
        let selectedPlanetsCount = this.getSelectedPlanetsCount()
        return (
            <React.Fragment>
                <div id="planetSelectionContainer" className="flex-60 layout-column layout-align-center-center">
                    <div style={styles.textBody}>
                        <span id="planetSelectionHeader" style={styles.pageHeading}>{`Select planets you want to search in:`}</span>
                    </div>
                    <div style={styles.textBody}>
                        <span id="planetSelectionBody" style={styles.pageBody}>{`You can only choose 4 planets`}</span>
                    </div>

                    <div id="planetSelectionMainBody" style={styles.planetViewGrid} className="layout-row layout-align-center">
                        {this.state.error ? errorMessage : this.state.isBusy ? spinner : planets}
                    </div>

                    {selectedPlanetsCount == 4 &&
                        <div style={styles.selectVehicleChip} className="layout-align-center-center layout-row">
                            <Chip id="planetSelectionVehicleSelectionButton"
                                onClick={this.goToVehicleSelection}
                                label={(<span style={styles.pageBody}>{`Now select vehicles to send to these planets`}</span>)}
                                style={styles.welcomeButtonChip}
                            ></Chip>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default PlanetSelection;