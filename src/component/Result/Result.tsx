import React from 'react';
import Langaburu from '../../images/Langaburu.png'
import { styles } from '../../style/Style';
import { Chip, CircularProgress, Card } from '@material-ui/core';
import { responseData, requestData } from '../../contract/result';
import FindFalconeService from '../../service/FindFalconeService';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

interface IResultProps {
    requestData: requestData
    goToHome: Function
}

interface IResultStates {
    result: responseData
}


export class Result extends React.Component<IResultProps, IResultStates> {

    private findFalconeService = new FindFalconeService()
    constructor(props: any) {
        super(props)
        this.state = { result: { status: "" } }
    }

    goToHome = () => {
        this.props.goToHome()
    }

    componentDidMount = () => {
        this.findFalconeService.find(this.props.requestData)
            .then((response) => {
                return response.json();
            })
            .then((myJson: any) => {
                console.log(myJson)
                this.setState({ result: myJson })
            }).catch((error: any) => {
                this.setState({ result: { status: "error" } })
            });
    }

    render() {

        let result;

        switch (this.state.result.status) {
            case "success":
                result = (
                    <React.Fragment>
                        <p style={styles.pageBody}>{`Success! Congratulations on Finding Falcone. King Shan is mighty pleased.`}</p>
                        <p style={styles.pageBody}>{`Planet found: ${this.state.result.planet_name}.`}</p>
                    </React.Fragment>)
                break;

            case "false":
                result = (
                    <p style={styles.pageBody}>{`Falcone Not found!`}</p>
                )
                break;

            case "error":
                result = (
                    <Card id="resultErrorMessage" style={styles.errorMessageCard}>
                        <div className="layout-row layout-align-space-around-center">
                            <ErrorIcon style={styles.errorMessageIcon} />
                            <p id="resultErrorMessageText" style={styles.errorMessage}>{`Something went wrong, Please start again.`}</p>
                        </div>
                    </Card>
                )
                break;

            default:
                result = (
                    <div id="resultSpinner"  className="layout-column layout-align-center-center" style={styles.spinnerContainer}>
                        <CircularProgress style={styles.isBusy} />
                        <span id="resultSpinnerText" style={styles.spinnerLabel}>{`Finding Falcone...`}</span>
                    </div>
                )
                break;
        }



        return (
            <React.Fragment>
                <div id="resultPageContainer" className="flex-70 layout-row layout-space-around-stretch">
                    <div style={styles.welcomePage} className="layout-column layout-align-space-around-center">
                        <img id="ResultLangburuImage" style={styles.image} src={Langaburu} />
                        <span id="ResultHeader" style={styles.pageHeading}>{`Finding Falcone!`}</span>
                        {result}
                        <Chip
                            label={`Start Again`}
                            style={styles.welcomeButtonChip}
                            onClick={this.goToHome}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Result;