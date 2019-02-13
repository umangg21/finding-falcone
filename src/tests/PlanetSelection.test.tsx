import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import PlanetSelection from '../component/Planet/PlanetSelection';
import FindFalconeService from '../service/FindFalconeService';
import { async, delay } from 'q';

function createPlanetSelectionComponent() {
    return mount(
        <PlanetSelection
            goToHome={() => { }}
            goToVehicleSelection={() => { }}
        />
    )
}

function createShallowPlanetSelectionComponent() {
    return shallow(
        <PlanetSelection
            goToHome={() => { }}
            goToVehicleSelection={() => { }}
        />
    )
}

configure({ adapter: new Adapter() });

describe('Planet Selection Component : ', () => {

    it('should render properly', () => {
        const PlanetSelectionComponentWrapper = createPlanetSelectionComponent()

        let planetSelectionHeader = PlanetSelectionComponentWrapper.find('#planetSelectionHeader')
        expect(planetSelectionHeader.exists()).toBeTruthy()
        expect(planetSelectionHeader.text()).toBe('Select planets you want to search in:')

        let planetSelectionBody = PlanetSelectionComponentWrapper.find('#planetSelectionBody')
        expect(planetSelectionBody.exists()).toBeTruthy()
        expect(planetSelectionBody.text()).toBe('You can only choose 4 planets')
    })

    it('should display spinner initialy', () => {
        const PlanetSelectionComponentWrapper = createPlanetSelectionComponent()

        let planetSelectionSpinner = PlanetSelectionComponentWrapper.find('#planetSelectionSpinner')
        expect(planetSelectionSpinner.exists()).toBeTruthy()

        let planetSelectionSpinnerText = PlanetSelectionComponentWrapper.find('#planetSelectionSpinnerText')
        expect(planetSelectionSpinnerText.exists()).toBeTruthy()
        expect(planetSelectionSpinnerText.text()).toBe('Reaching Space...')
    })

    it('should display error if service fails', async () => {
        const mockSuccessResonse = {}
        const mockJsonPromise = Promise.reject(mockSuccessResonse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        })
        jest.spyOn(FindFalconeService, 'getPlanets').mockImplementation(() => mockFetchPromise)

        const PlanetSelectionComponentWrapper = createShallowPlanetSelectionComponent()

        expect(FindFalconeService.getPlanets).toHaveBeenCalledTimes(1)
        expect(PlanetSelectionComponentWrapper.state('error')).toBe(false);

        await delay(0)

        expect(PlanetSelectionComponentWrapper.state('error')).toBe(true);

        const planetSelectionErrorMessage = PlanetSelectionComponentWrapper.find('#planetSelectionErrorMessage')
        expect(planetSelectionErrorMessage.exists()).toBeTruthy()

        const planetSelectionErrorMessageText = PlanetSelectionComponentWrapper.find('#planetSelectionErrorMessageText')
        expect(planetSelectionErrorMessageText.exists()).toBeTruthy()
        expect(planetSelectionErrorMessageText.text()).toBe('Something went wrong, Please start again.')
        jest.restoreAllMocks();
    })

    it('should display planets after service call', async () => {
        const mockSuccessResonse = [
            {
                "name": "Donlon",
                "distance": 100,
                "id": 0,
                "isSelected": true,
                "selectedVehicleId": -1
            },
            {
                "name": "Enchai",
                "distance": 200,
                "id": 1,
                "isSelected": true,
                "selectedVehicleId": -1
            }
        ]
        const mockJsonPromise = Promise.resolve(mockSuccessResonse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        })
        jest.spyOn(FindFalconeService, 'getPlanets').mockImplementation(() => mockFetchPromise)

        const PlanetSelectionComponentWrapper = createShallowPlanetSelectionComponent()

        expect(FindFalconeService.getPlanets).toHaveBeenCalledTimes(1)
        expect(PlanetSelectionComponentWrapper.state('error')).toBe(false);

        await delay(0)

        expect(PlanetSelectionComponentWrapper.state('error')).toBe(false);

        const planetSelectionMainBody = PlanetSelectionComponentWrapper.find('#planetSelectionMainBody')
        expect(planetSelectionMainBody.exists()).toBeTruthy()
        expect(planetSelectionMainBody.children().length).toBe(mockSuccessResonse.length)
        jest.restoreAllMocks()
    })

    it('should display vehicle selection button after selecting 4 planets', async () => {
        const mockSuccessResonse = [
            {
                "name": "Donlon",
                "distance": 100,
                "id": 0,
                "isSelected": true,
                "selectedVehicleId": -1
            },
            {
                "name": "Enchai",
                "distance": 200,
                "id": 1,
                "isSelected": true,
                "selectedVehicleId": -1
            },
            {
                "name": "Jebing",
                "distance": 300,
                "id": 2,
                "isSelected": true,
                "selectedVehicleId": -1
            },
            {
                "name": "Sapir",
                "distance": 400,
                "id": 3,
                "isSelected": true,
                "selectedVehicleId": -1
            }
        ]
        const mockJsonPromise = Promise.resolve(mockSuccessResonse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        })
        jest.spyOn(FindFalconeService, 'getPlanets').mockImplementation(() => mockFetchPromise)

        const PlanetSelectionComponentWrapper = createShallowPlanetSelectionComponent()
        const PlanetSelectionComponentWrapperinstance = PlanetSelectionComponentWrapper.instance();

        expect(FindFalconeService.getPlanets).toHaveBeenCalledTimes(1)
        expect(PlanetSelectionComponentWrapper.state('error')).toBe(false);

        await delay(0)

        expect(PlanetSelectionComponentWrapper.state('error')).toBe(false);

        PlanetSelectionComponentWrapperinstance.onCardSelect(0)
        PlanetSelectionComponentWrapperinstance.onCardSelect(1)
        PlanetSelectionComponentWrapperinstance.onCardSelect(2)
        PlanetSelectionComponentWrapperinstance.onCardSelect(3)
        await delay(0)

        let planetSelectionVehicleSelectionButton = PlanetSelectionComponentWrapper.find('#planetSelectionVehicleSelectionButton')
        expect(planetSelectionVehicleSelectionButton.exists()).toBeTruthy()
        jest.restoreAllMocks()
    })
})
