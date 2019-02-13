import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { Planet } from '../../contract/planet';
import PlanetView from './PlanetView';
import { styles } from '../../style/Style';

import AddIcon from '@material-ui/icons/Add';
import AddedIcon from '@material-ui/icons/Done';

interface IPlanetCardProps {
    planetData: Planet,
    onCardSelect: Function
}

interface IPlanetCardStates {
}


export class PlanetCard extends React.Component<IPlanetCardProps, IPlanetCardStates> {

    constructor(props: any) {
        super(props)
    }

    onCardSelect = () => {
        this.props.onCardSelect(this.props.planetData.id)
    }

    render() {
        var cardFooter;
        let planetCardContainerStyle = this.props.planetData.isSelected ? styles.planetCardContainerAdded : styles.planetCardContainer
        let cardFooterStyle = this.props.planetData.isSelected ? styles.planetCardFooterAdded : styles.planetCardFooter

        if (this.props.planetData.isSelected) {
            cardFooter = (
                <div style={cardFooterStyle} className="layout-row layout-align-space-around-center">
                    <span id={`planetCardAddedText${this.props.planetData.id}`}>{`Added`}</span>
                    <span id={`planetCardAddedIcon${this.props.planetData.id}`} className="layout-row- layout-align-center-center">                    
                        <AddedIcon style={styles.addIcon} />
                    </span>
                </div>
            )
        } else {
            cardFooter = (
                <div style={cardFooterStyle} className="layout-row layout-align-space-around-center">
                    <span id={`planetCardAddText${this.props.planetData.id}`}>{`Add`}</span>
                    <span id={`planetCardAddIcon${this.props.planetData.id}`} className="layout-row- layout-align-center-center">
                        <AddIcon style={styles.addIcon} />
                    </span>
                </div>
            )
        }

        return (

            <React.Fragment>
                <Card style={planetCardContainerStyle}>
                    <CardActionArea onClick={this.onCardSelect}>
                        <div id={`planetCardContainer${this.props.planetData.id}`}  className="layout-column">
                            <PlanetView
                                planetData={this.props.planetData}
                            />
                            {cardFooter}
                        </div>
                    </CardActionArea>
                </Card>

            </React.Fragment>
        )
    }
}

export default PlanetCard;