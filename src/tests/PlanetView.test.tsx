import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import PlanetView from '../component/Planet/PlanetView';

configure({ adapter: new Adapter() });

describe('Planet View Component : ', () => {

    const planetData = {
        "name": "Donlon",
        "distance": 100,
        "id": 0,
        "isSelected": true,
        "selectedVehicleId": 0
    }

    const planetViewComponentWrapper = mount(<PlanetView planetData={planetData}></PlanetView>)

    it('should render properly', () => {

        let planetViewImage = planetViewComponentWrapper.find('#planetViewImage0')
        expect(planetViewImage.exists()).toBeTruthy()

        let planetViewName = planetViewComponentWrapper.find('#planetViewName0')
        expect(planetViewName.exists()).toBeTruthy()
        expect(planetViewName.text()).toBe('Donlon')

        let planetViewDistance = planetViewComponentWrapper.find('#planetViewDistance0')
        expect(planetViewDistance.exists()).toBeTruthy()
        expect(planetViewDistance.text()).toBe('100 megamiles')
    })

})