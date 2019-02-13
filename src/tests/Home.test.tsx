import React from 'react';
import { async, delay } from 'q';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import Home from '../component/Home';
import { viewPage } from '../contract/viewPage';

configure({ adapter: new Adapter() });

function createHomeComponent() {
    return mount(<Home />)
}

describe('Home Component Test', () => {

    it('should render properly Planet Selection', () => {
        const HomeComponent = createHomeComponent()
        
        const pageFooterGeekTrust = HomeComponent.find('#pageFooterGeekTrust')
        expect(pageFooterGeekTrust.exists()).toBeTruthy()
        expect(pageFooterGeekTrust.text()).toBe('Coding Problem: https://www.geektrust.in/coding-problem/frontend/space')       
    })

    it('should display welcome page initialy', () => {
        const HomeComponent = createHomeComponent()
        expect(HomeComponent.state('visiblePage')).toBe(viewPage.Welcome)

        const WelcomeComponent =  HomeComponent.find('#welcomeContainer')
        expect(WelcomeComponent.exists()).toBeTruthy()
    })
    
    it('should route to PlanetSelection on routePlanetSelection Click', async() => {
        const HomeComponent = createHomeComponent()
        const HomeComponentInstance = HomeComponent.instance()
        
        HomeComponentInstance.routePlanetSelection()
        await delay(0)
        HomeComponent.update()   

        expect(HomeComponent.state('visiblePage')).toBe(viewPage.PlanetSelection)
        const PlanetSelection =  HomeComponent.find('#planetSelectionContainer')
        expect(PlanetSelection.exists()).toBeTruthy()
    })
    
    it('should route to VehicleSelection on routePlanetSelection Click', async() => {
        const HomeComponent = createHomeComponent()
        const HomeComponentInstance = HomeComponent.instance()
        
        HomeComponentInstance.goToVehicleSelection([])
        await delay(0)
        HomeComponent.update()
        
        expect(HomeComponent.state('visiblePage')).toBe(viewPage.VehicleSelection)
        const VehicleSelection =  HomeComponent.find('#vehicleSelectionContainer')
        expect(VehicleSelection.exists()).toBeTruthy()
    })    

    it('should route to result page on goToFIndFalcone Click', async() => {
        const HomeComponent = createHomeComponent() 
        const HomeComponentInstance = HomeComponent.instance()
        let mockPlanetData = {
            "name": "Donlon",
            "distance": 100,
            "id": 0,
            "isSelected": true,
            "selectedVehicleId": 0
        }
        let mockVehicleData= { "id": 0, "name": "Space pod", "total_no": 2, "max_distance": 200, "speed": 2, "availible_no": 2 }
        HomeComponentInstance.goToFIndFalcone([mockPlanetData],[mockVehicleData])
        await delay(0)
        HomeComponent.update()
        
        expect(HomeComponent.state('visiblePage')).toBe(viewPage.ResultView)
        const ResultView =  HomeComponent.find('#resultPageContainer')
        expect(ResultView.exists()).toBeTruthy()
    })

    it('should route to welcome page on routeWelcomeSelection Click', async() => {
        const HomeComponent = createHomeComponent()
        const HomeComponentInstance = HomeComponent.instance()
        
        HomeComponentInstance.routeWelcomeSelection()
        await delay(0)
        HomeComponent.update()
        
        expect(HomeComponent.state('visiblePage')).toBe(viewPage.Welcome)
        const WelcomeComponent =  HomeComponent.find('#welcomeContainer')
        expect(WelcomeComponent.exists()).toBeTruthy()
    })
    
})
