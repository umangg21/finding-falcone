import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import Result from '../component/Result/Result';
import FindFalconeService from '../service/FindFalconeService';
import { delay } from 'q';

configure({ adapter: new Adapter() });

const requestData = {
    "token": "test",
    "planet_names": ["test", "test1"],
    "vehicle_names": ["test", "test1"]
}

function createResultComponent() {
    return shallow(
        <Result
            requestData={requestData}
            goToHome={() => { }}
        />)
}

describe('Result Component', () => {
    it('should render properly', () => {
        const ResultComponent = createResultComponent()
        const ResultLangburuImage = ResultComponent.find('#ResultLangburuImage')
        expect(ResultLangburuImage.exists()).toBeTruthy()

        const ResultHeader = ResultComponent.find('#ResultHeader')
        expect(ResultHeader.exists()).toBeTruthy()
        expect(ResultHeader.text()).toBe('Finding Falcone!')
    })

    it('should display spinner initialy', () => {
        const ResultComponent = createResultComponent()

        const resultSpinner = ResultComponent.find('#resultSpinner')
        expect(resultSpinner.exists()).toBeTruthy()
        
        const resultSpinnerText = ResultComponent.find('#resultSpinnerText')
        expect(resultSpinnerText.exists()).toBeTruthy()
        expect(resultSpinnerText.text()).toBe('Finding Falcone...')
    })
})
