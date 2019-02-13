import React from 'react';
import { Card, CardActionArea, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Planet } from '../../contract/planet';
import PlanetView from '../Planet/PlanetView';
import { styles } from '../../style/Style';
import { Vehicle } from '../../contract/vehicle';
import PodIcon from '../../images/pod.png'
import RocketIcon from '../../images/rocket.png'
import ShipIcon from '../../images/ship.png'
import ShuttleIcon from '../../images/shuttle.png'
import AddedIcon from '@material-ui/icons/Done';

interface IVehicleCardProps {
    planetData: Planet,
    vehicleData: Vehicle[]
    onVehicleSelect: Function,
}

interface IVehicleCardStates {
}

const SpaceIcons = [PodIcon, RocketIcon, ShuttleIcon, ShipIcon]

export class VehicleCard extends React.Component<IVehicleCardProps, IVehicleCardStates> {

    constructor(props: any) {
        super(props)

    }

    handleListItemClick = (event: number) => {
        this.props.onVehicleSelect(event, this.props.planetData.id)
    }

    getAvailibleVehicle = () => {
        let availibleVehicles = this.props.vehicleData.filter(vehicle =>
            (vehicle.max_distance >= this.props.planetData.distance)
        )

        return availibleVehicles.map((vehicle, index) =>
            (
                <ListItem
                    id={`VehicleCardListItem${vehicle.id}`}
                    button
                    value={vehicle.id}
                    key={index}
                    disabled={vehicle.availible_no == 0 && this.props.planetData.selectedVehicleId != vehicle.id}
                    selected={this.props.planetData.selectedVehicleId === vehicle.id}
                    onClick={event => this.handleListItemClick(vehicle.id)}
                >
                    <ListItemIcon style={styles.ListItemIcon}>
                        <img id={`VehicleCardListItemIcon${vehicle.id}`} style={styles.spaceShipIcon} src={SpaceIcons[vehicle.id]}></img>
                    </ListItemIcon>

                    <ListItemText id={`VehicleCardListItemText${vehicle.id}`} primary={`${vehicle.name} ${vehicle.availible_no}`}  style={styles.ListItemText}/>
                    {this.props.planetData.selectedVehicleId === vehicle.id &&
                        <AddedIcon style={styles.vehicleAddedIcon} />}
                </ListItem>
            ))
    }

    render() {

        let planetView = (
            <PlanetView
                planetData={this.props.planetData}
            />
        )

        let availibleVehicle = this.getAvailibleVehicle()

        return (
            <React.Fragment>
                <Card style={styles.VehicleCardContainer} className="layout-column">
                    {planetView}
                    <span id={`VehicleCardSelectvehicle${this.props.planetData.id}`} style={styles.VehicleSelectionDescription} className="layout-row layout-align-center-center">
                        {`Select Vehicle`}
                    </span>
                    <List id="VehicleSelectionList" component="nav" >
                        {availibleVehicle}
                    </List>

                </Card>

            </React.Fragment>
        )
    }
}

export default VehicleCard;