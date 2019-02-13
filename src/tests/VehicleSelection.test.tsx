import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';
import VehicleSelection from '../component/Vehicle/VehicleSelection';
import FindFalconeService from '../service/FindFalconeService';
import { async, delay } from 'q';

const planetData = [
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

function createVehicleSelectionComponent() {
    return mount(
        <VehicleSelection
            planets={planetData}
            goToFIndFalcone={() => { }}
            goToHome={() => { }}
        />
    )
}

function createShallowVehicleSelectionComponent() {
    return shallow(
        <VehicleSelection
            planets={planetData}
            goToHome={() => { }}
            goToFIndFalcone={() => { }}
        />
    )
}

configure({ adapter: new Adapter() });

describe('Vehicle Selection Component', () => {

    it('should render properly', () => {
        const ShallowVehicleSelectionComponent = createShallowVehicleSelectionComponent()
        
        const vehicleSelectionHeader = ShallowVehicleSelectionComponent.find('#vehicleSelectionHeader')
        expect(vehicleSelectionHeader.exists()).toBeTruthy()
        expect(vehicleSelectionHeader.text()).toBe('Assign vehicles to your planets')
        
        const vehicleSelectionBodyText = ShallowVehicleSelectionComponent.find('#vehicleSelectionBodyText')
        expect(vehicleSelectionBodyText.exists()).toBeTruthy()
        expect(vehicleSelectionBodyText.text()).toBe('Total time to reach all the planets : 0')
        
    })

    it('should diplay spinner initialy', () => {
        const ShallowVehicleSelectionComponent = createShallowVehicleSelectionComponent()
        
        expect(ShallowVehicleSelectionComponent.state('isBusy')).toBe(true);

        const vehicleSelectionSpinner = ShallowVehicleSelectionComponent.find('#vehicleSelectionSpinner')
        expect(vehicleSelectionSpinner.exists()).toBeTruthy()
        
        const vehicleSelectionSpinnerText = ShallowVehicleSelectionComponent.find('#vehicleSelectionSpinnerText')
        expect(vehicleSelectionSpinnerText.exists()).toBeTruthy()
        expect(vehicleSelectionSpinnerText.text()).toBe('Finding Vehicles...')
    })

    it('should display error if api fails',  async() => {
        const mockRejectResonse = {}
        const mockJsonPromise = Promise.reject(mockRejectResonse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        })
        jest.spyOn(FindFalconeService, 'getVehicles').mockImplementation(() => mockFetchPromise)

        const ShallowVehicleSelectionComponent = createShallowVehicleSelectionComponent()
        
        expect(FindFalconeService.getVehicles).toHaveBeenCalledTimes(1)
        expect(ShallowVehicleSelectionComponent.state('error')).toBe(false);

        await delay(0)

        expect(ShallowVehicleSelectionComponent.state('error')).toBe(true);
        const vehicleSelectionErrorMessage = ShallowVehicleSelectionComponent.find('#vehicleSelectionErrorMessage')
        expect(vehicleSelectionErrorMessage.exists()).toBeTruthy()

        const vehicleSelectionErrorMessageText = ShallowVehicleSelectionComponent.find('#vehicleSelectionErrorMessageText')
        expect(vehicleSelectionErrorMessageText.exists()).toBeTruthy()
        expect(vehicleSelectionErrorMessageText.text()).toBe('Something went wrong, Please start again.')
        jest.restoreAllMocks();
    })
    
    it('should display vehicles after service call', async () => {
        const mockSuccessResonse = [
            { "id": 0, "name": "Space pod", "total_no": 2, "max_distance": 200, "speed": 2, "availible_no": 2 },
            { "id": 1, "name": "Space rocket", "total_no": 1, "max_distance": 300, "speed": 4, "availible_no": 1 },
            { "id": 2, "name": "Space shuttle", "total_no": 1, "max_distance": 400, "speed": 5, "availible_no": 1 },
            { "id": 3, "name": "Space ship", "total_no": 2, "max_distance": 600, "speed": 10, "availible_no": 2 }
        ]
        const mockJsonPromise = Promise.resolve(mockSuccessResonse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        })
        jest.spyOn(FindFalconeService, 'getVehicles').mockImplementation(() => mockFetchPromise)
        const ShallowVehicleSelectionComponent = createShallowVehicleSelectionComponent()
        
        expect(FindFalconeService.getVehicles).toHaveBeenCalledTimes(1)
        expect(ShallowVehicleSelectionComponent.state('error')).toBe(false);

        await delay(0)

        expect(ShallowVehicleSelectionComponent.state('error')).toBe(false);
        const vehicleSelectionBody = ShallowVehicleSelectionComponent.find('#vehicleSelectionBody')
        expect(vehicleSelectionBody.exists()).toBeTruthy()
        expect(vehicleSelectionBody.children().length).toBe(planetData.length)
        jest.restoreAllMocks()
    })   

    it('should work onVehicleSelect as expected', async () => {
        const mockSuccessResonse = [
            { "id": 0, "name": "Space pod", "total_no": 2, "max_distance": 200, "speed": 2, "availible_no": 2 },
            { "id": 1, "name": "Space rocket", "total_no": 1, "max_distance": 300, "speed": 4, "availible_no": 1 },
            { "id": 2, "name": "Space shuttle", "total_no": 1, "max_distance": 400, "speed": 5, "availible_no": 1 },
            { "id": 3, "name": "Space ship", "total_no": 2, "max_distance": 600, "speed": 10, "availible_no": 2 }
        ]
        const mockJsonPromise = Promise.resolve(mockSuccessResonse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise
        })
        jest.spyOn(FindFalconeService, 'getVehicles').mockImplementation(() => mockFetchPromise)
        const ShallowVehicleSelectionComponent = createShallowVehicleSelectionComponent()

        await delay(0)
        const ShallowVehicleSelectionComponentInstance = ShallowVehicleSelectionComponent.instance()

        expect(ShallowVehicleSelectionComponent.state('vehicles')).toEqual(mockSuccessResonse)
        expect(ShallowVehicleSelectionComponent.state('selectedPlanets')).toEqual(planetData)

        // should attach a vehicle(id= 0) to planet(id=0)
        ShallowVehicleSelectionComponentInstance.onVehicleSelect(0,0)

        let allVehicles = [...mockSuccessResonse]
        allVehicles[0].availible_no -=1
        let allPlanets = [...planetData]
        allPlanets[0].selectedVehicleId = 0

        await delay(0)
        expect(ShallowVehicleSelectionComponent.state('vehicles')).toEqual(allVehicles)
        expect(ShallowVehicleSelectionComponent.state('selectedPlanets')).toEqual(allPlanets)

        // should attach a new vehicle(id= 1) to planet(id=0)
        ShallowVehicleSelectionComponentInstance.onVehicleSelect(1,0)

        allVehicles[0].availible_no +=1        
        allPlanets[0].selectedVehicleId = -1

        allVehicles[1].availible_no -=1        
        allPlanets[0].selectedVehicleId = 1

        await delay(0)
        expect(ShallowVehicleSelectionComponent.state('vehicles')).toEqual(allVehicles)
        expect(ShallowVehicleSelectionComponent.state('selectedPlanets')).toEqual(allPlanets)

        // should deattach a vehicle(id= 1) to planet(id=0) if again selected
        ShallowVehicleSelectionComponentInstance.onVehicleSelect(1,0)

        allVehicles[1].availible_no +=1        
        allPlanets[0].selectedVehicleId = -1
        
        await delay(0)
        expect(ShallowVehicleSelectionComponent.state('vehicles')).toEqual(allVehicles)
        expect(ShallowVehicleSelectionComponent.state('selectedPlanets')).toEqual(allPlanets)

        jest.restoreAllMocks()
    })
})
