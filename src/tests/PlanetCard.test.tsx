import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import PlanetCard from '../component/Planet/PlanetCard';
import { Planet } from '../contract/planet';

configure({ adapter: new Adapter() });

function createPlanetCardComponentWrapper(planetData: Planet) {
    return mount(
        <PlanetCard
            planetData={planetData}
            onCardSelect={() => { }}
        />
    )
}

describe('Planet Card Component : ', () => {

    const planetData = {
        "name": "Donlon",
        "distance": 100,
        "id": 0,
        "isSelected": false,
        "selectedVehicleId": 0
    }

    const planetDataSelected = {
        "name": "Donlon",
        "distance": 100,
        "id": 0,
        "isSelected": true,
        "selectedVehicleId": 0
    }

    describe('Selected Card : ', () => {
        const planetCardComponentWrapper = createPlanetCardComponentWrapper(planetDataSelected)

        it('Should render properly', () => {

            let planetCardContainer = planetCardComponentWrapper.find('#planetViewContainer0')
            expect(planetCardContainer.exists()).toBeTruthy()

            let planetCardAddedIcon = planetCardComponentWrapper.find('#planetCardAddedIcon0')
            expect(planetCardAddedIcon.exists()).toBeTruthy()

            let planetCardAddedText = planetCardComponentWrapper.find('#planetCardAddedText0')
            expect(planetCardAddedText.exists()).toBeTruthy()
            expect(planetCardAddedText.text()).toBe('Added')

            expect(true).toBeTruthy()
        })
    })

    describe('Unselected Card : ', () => {
        const planetCardComponentWrapper = createPlanetCardComponentWrapper(planetData)

        it('Should render properly', () => {

            let planetCardContainer = planetCardComponentWrapper.find('#planetViewContainer0')
            expect(planetCardContainer.exists()).toBeTruthy()

            let planetCardAddIcon = planetCardComponentWrapper.find('#planetCardAddIcon0')
            expect(planetCardAddIcon.exists()).toBeTruthy()

            let planetCardAddText = planetCardComponentWrapper.find('#planetCardAddText0')
            expect(planetCardAddText.exists()).toBeTruthy()
            expect(planetCardAddText.text()).toBe('Add')

            expect(true).toBeTruthy()
        })
    })
})