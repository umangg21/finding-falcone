import React from 'react';
import { viewPage } from '../contract/viewPage';
import Welcome from './Welcome';
import PlanetSelection from './Planet/PlanetSelection';
import { Planet } from '../contract/planet';
import VehicleSelection from './Vehicle/VehicleSelection';
import Result from './Result/Result';
import { styles } from '../style/Style';
import { Vehicle } from '../contract/vehicle';
import { requestData } from '../contract/result';

interface IHomeProps {
}

interface IHomeStates {
    visiblePage: viewPage,
    planets: Planet[],
    requestData?: requestData,
}

function getHomeStyle() {
    return {
        minHeight: "-webkit-fill-available",
        backgroundColor: `#252121`,
    }
}

export class Home extends React.Component<IHomeProps, IHomeStates> {

    constructor(props: any) {
        super(props)
        this.state = { visiblePage: viewPage.Welcome, planets: [], requestData: undefined }
    }

    routePlanetSelection = () => {
        this.setState({ visiblePage: viewPage.PlanetSelection })
    }

    routeWelcomeSelection = () => {
        this.setState({ visiblePage: viewPage.Welcome, planets: [], requestData: undefined })
    }

    goToVehicleSelection = (planetsData: Planet[]) => {
        this.setState({ visiblePage: viewPage.VehicleSelection, planets: planetsData })
    }

    goToFIndFalcone = (planets: Planet[], vehicles: Vehicle[]) => {
        let resultRequestData: requestData = {
            token: "",
            planet_names: [],
            vehicle_names: [],
        }
        planets.forEach(planet => {
            resultRequestData.planet_names.push(planet.name)
            resultRequestData.vehicle_names.push(vehicles[planet.selectedVehicleId].name)
        })

        this.setState({ requestData: resultRequestData, visiblePage: viewPage.ResultView })
    }

    render() {
        var visiblePage;

        switch (this.state.visiblePage) {
            case viewPage.PlanetSelection:
                visiblePage = (
                    <PlanetSelection
                        goToHome={this.routeWelcomeSelection}
                        goToVehicleSelection={this.goToVehicleSelection}
                    />
                )
                break;

            case viewPage.VehicleSelection:
                visiblePage = (
                    <VehicleSelection
                        goToHome={this.routeWelcomeSelection}
                        planets={this.state.planets}
                        goToFIndFalcone={this.goToFIndFalcone}
                    />
                )
                break;

            case viewPage.ResultView:
                if (this.state.requestData) {
                    visiblePage = (
                        <Result
                            requestData={this.state.requestData}
                            goToHome={this.routeWelcomeSelection}
                        />
                    )
                }
                break;

            default:
                visiblePage = (
                    <Welcome
                        routePlanetSelection={this.routePlanetSelection}
                    />
                )
                break;
        }

        let bodyFlex = this.state.visiblePage == viewPage.VehicleSelection ? `flex-80 ` : 'flex-60 '
        let sideFlex = this.state.visiblePage == viewPage.VehicleSelection ? `flex-10 ` : 'flex-20 '

        let pageFooterGeekTrust = (
            <span id="pageFooterGeekTrust" style={styles.pageFooter}>{`Coding Problem: `}
                <a style={styles.pageFooterLink}
                    target={"_blank"}
                    href="https://www.geektrust.in/coding-problem/frontend/space">
                    {`https://www.geektrust.in/coding-problem/frontend/space`}
                </a>
            </span>
        )

        let pageFooterReset = (
            <div className="layout-row layout-align-end" style={styles.resetLinks}>
                <span id="pageFooterReset" style={styles.pageResetLink} onClick={this.routeWelcomeSelection}>
                    {`Reset |`}&nbsp;
                </span>
                <a style={styles.pageResetLink}
                    target={"_blank"}
                    href="https://www.geektrust.in/">
                    {`GeekTrust Home`}
                </a>
            </div>
        )

        return (
            <React.Fragment>
                <div id="HomeComponet" className="layout-row layout-xs-column layout-align-center-center" style={getHomeStyle()}>
                    <div className={sideFlex}>
                    </div>
                    <div className={bodyFlex + "layout-column layout-align-center-center"}>
                        {visiblePage}
                        {pageFooterGeekTrust}
                        {this.state.visiblePage !== viewPage.Welcome &&
                            pageFooterReset
                        }
                    </div>
                    <div className={sideFlex}>
                    </div>
                </div>


            </React.Fragment>
        )
    }
}

export default Home;