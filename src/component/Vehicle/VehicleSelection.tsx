import React from 'react';
import { Chip, CircularProgress, Card } from '@material-ui/core';
import { Planet } from '../../contract/planet';
import { Vehicle } from '../../contract/vehicle';
import FindFalconeService from '../../service/FindFalconeService';
import { styles } from '../../style/Style';
import VehicleCard from './VehichleCard';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

interface IVehicleSelectionProps {
    planets: Planet[]
    goToFIndFalcone: Function;
    goToHome: Function;
}

interface IVehicleSelectionStates {
    selectedPlanets: Planet[]
    vehicles: Vehicle[]
    totalTime: number
    isBusy: boolean
    error: boolean
}

export class VehicleSelection extends React.Component<IVehicleSelectionProps, IVehicleSelectionStates> {

    constructor(props: any) {
        super(props)
        this.state = { selectedPlanets: [], vehicles: [], totalTime: 0, isBusy: true, error: false }
    }

    goToHome = () => {
        this.props.goToHome()
    }

    mapVehicleData = (vehicleData: Vehicle[]) => {
        vehicleData.forEach((vehicle, index) => {
            vehicle.id = index
            vehicle.availible_no = vehicle.total_no
        })

        let selectedPlanets = this.props.planets.filter(planet => planet.isSelected)

        selectedPlanets.forEach((planet: Planet) => {
            planet.selectedVehicleId = -1
        })

        this.setState({ selectedPlanets: selectedPlanets, vehicles: vehicleData, isBusy: false })

    }

    getVehicleSelectionGrid = () => {
        return this.state.selectedPlanets.map((planet, index) => (
            <VehicleCard
                key={index}
                planetData={planet}
                vehicleData={this.state.vehicles}
                onVehicleSelect={this.onVehicleSelect}
            />
        ))
    }

    onVehicleSelect = (newVehicleId: number, planetId: number) => { // 1 , 0
        let allVehicles = this.state.vehicles
        let allPlanets = this.state.selectedPlanets

        let planetIndex = allPlanets.findIndex(planet => planet.id == planetId) // 0
        let oldVehicleId = allPlanets[planetIndex].selectedVehicleId // 0

        if (oldVehicleId > -1) {
            //  If a vehicle is previously selected
            // Unselect old vehicle => 
            // Remove old vehicle from selected planet
            // Increase oldvehicle avilible number
            allPlanets[planetIndex].selectedVehicleId = -1
            allVehicles[oldVehicleId].availible_no += 1
        }
 
        if (oldVehicleId !== newVehicleId &&  allVehicles[newVehicleId].availible_no > 0) {
            // To select new vehicle for a planet 
            // Decrease new vehicle avialible number
            // Attach new vehicle with selected planet
            allVehicles[newVehicleId].availible_no -= 1
            allPlanets[planetIndex].selectedVehicleId = newVehicleId
        }

        let timetaken = this.getTotalTime(allPlanets)

        this.setState({ vehicles: allVehicles, selectedPlanets: allPlanets, totalTime: timetaken })
    }

    getTotalTime = (allPlanets: Planet[]) => {
        let timeTaken = 0
        allPlanets.forEach(planet => {
            if (planet.selectedVehicleId >= 0) {
                let vehicle = this.state.vehicles[planet.selectedVehicleId]
                timeTaken += (planet.distance / vehicle.speed)
            }
        })
        return timeTaken
    }

    goToFIndFalcone = () => {
        this.props.goToFIndFalcone(this.state.selectedPlanets, this.state.vehicles)
    }

    componentDidMount = () => {
        FindFalconeService.getVehicles()
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                this.mapVehicleData(myJson)
            }).catch((error: any) => {
                this.setState({ error: true })
            });
    };


    render() {
        let spinner = (
            <div id="vehicleSelectionSpinner" className="layout-column layout-align-center-center" style={styles.spinnerContainer}>
                <CircularProgress style={styles.isBusy} />
                <span id="vehicleSelectionSpinnerText" style={styles.spinnerLabel}>{`Finding Vehicles...`}</span>
            </div>
        )

        let errorMessage = (
            <div id="vehicleSelectionErrorMessage" className="layout-column layout-align-center-center">
                <Card style={styles.errorMessageCard}>
                    <div className="layout-row layout-align-space-around-center">
                        <ErrorIcon style={styles.errorMessageIcon} />
                        <p id="vehicleSelectionErrorMessageText" style={styles.errorMessage}>{`Something went wrong, Please start again.`}</p>
                    </div>
                </Card>
                <Chip
                    label={`Start Again`}
                    style={styles.welcomeButtonChip}
                    onClick={this.goToHome}
                />
            </div>
        )

        let VehicleSelectionGrid = this.getVehicleSelectionGrid()
        let shouldDisplayButton = this.state.selectedPlanets.every(planet => planet.selectedVehicleId >= 0)
        return (
            <React.Fragment>

                <div id="vehicleSelectionContainer" className="flex-70 layout-column layout-align-center-center">
                    <div style={styles.textBody}>
                        <span id="vehicleSelectionHeader" style={styles.pageHeading}>{`Assign vehicles to your planets`}</span>
                    </div>
                    <div style={styles.textBody}>
                        <span id="vehicleSelectionBodyText" style={styles.pageBody}>{`Total time to reach all the planets : ${this.state.totalTime}`}</span>
                    </div>

                    <div id="vehicleSelectionBody" style={styles.planetViewGrid} className="layout-row layout-align-center">
                        {this.state.error ? errorMessage : this.state.isBusy ? spinner : VehicleSelectionGrid}
                    </div>
                    <div style={styles.selectVehicleChip}>
                        {shouldDisplayButton && !this.state.isBusy &&
                            <Chip
                                onClick={this.goToFIndFalcone}
                                label={`Find Falcone`}
                                style={styles.welcomeButtonChip}
                            />
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default VehicleSelection;