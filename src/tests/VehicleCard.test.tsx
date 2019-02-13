import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import VehichleCard from '../component/Vehicle/VehichleCard';

configure({ adapter: new Adapter() });

const vehicleData = [
    { "id": 0, "name": "Space pod", "total_no": 2, "max_distance": 200, "speed": 2, "availible_no": 2 },
    { "id": 1, "name": "Space rocket", "total_no": 1, "max_distance": 300, "speed": 4, "availible_no": 1 },
    { "id": 2, "name": "Space shuttle", "total_no": 1, "max_distance": 400, "speed": 5, "availible_no": 1 },
    { "id": 3, "name": "Space ship", "total_no": 2, "max_distance": 600, "speed": 10, "availible_no": 2 }
]

const planetData = {
    "name": "Donlon",
    "distance": 100,
    "id": 0,
    "isSelected": false,
    "selectedVehicleId": 0
}

describe('Vehicle Card Component : ', () => {

    const VehicleCardComponent = mount(
        <VehichleCard
            vehicleData={vehicleData}
            planetData={planetData}
            onVehicleSelect={() => { }}
        />
    )

    it('should contain planet view', () => {
        const planetViewContainer = VehicleCardComponent.find('#planetViewContainer0')
        expect(planetViewContainer.exists()).toBeTruthy()
    })

    it('should contain Select Vehicle Button', () => {
        const VehicleCardSelectvehicle = VehicleCardComponent.find('#VehicleCardSelectvehicle0')
        expect(VehicleCardSelectvehicle.exists()).toBeTruthy()
        expect(VehicleCardSelectvehicle.text()).toBe('Select Vehicle')
    })

    it('should contain Vehicle Selection List', () => {
        const VehicleCardSelectvehicle = VehicleCardComponent.find('#VehicleSelectionList')
        expect(VehicleCardSelectvehicle.exists()).toBeTruthy()
    })

    it('should Have 4 List Item in Selection List', () => {
        const VehicleCardSelectvehicle = VehicleCardComponent.find('ListItem')
        expect(VehicleCardSelectvehicle.length).toBe(4)
    })

    it('should Have Image and Text in ListItem', () => {
        const VehicleCardSelectvehicleItem = VehicleCardComponent.find('ListItem').first()
        const VehicleCardSelectvehicleImage = VehicleCardSelectvehicleItem.find('#VehicleCardListItemIcon0')
        expect(VehicleCardSelectvehicleImage.exists()).toBeTruthy()
        const VehicleCardSelectvehicleText = VehicleCardSelectvehicleItem.find('#VehicleCardListItemText0')
        expect(VehicleCardSelectvehicleText.exists()).toBeTruthy()
    })
})
