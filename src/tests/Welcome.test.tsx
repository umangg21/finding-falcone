import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import Welcome from '../component/Welcome';

configure({ adapter: new Adapter() });


function testFunction() {
}

describe('Welcome Component : ', () => {
    const welcomeComponentWrapper = mount(
        <Welcome
            routePlanetSelection={testFunction}
        />
    )

    it('should render properly', () => {

        let welcomeContainer = welcomeComponentWrapper.find('#welcomeContainer')
        expect(welcomeContainer.exists()).toBeTruthy()

        let welcomeContainerLangaburuImage = welcomeComponentWrapper.find('#welcomeContainerLangaburuImage')
        expect(welcomeContainerLangaburuImage.exists()).toBeTruthy()
        expect(welcomeContainerLangaburuImage.type()).toBe('img')

        let welcomeContainerHeader = welcomeComponentWrapper.find('#welcomeContainerHeader')
        expect(welcomeContainerHeader.exists()).toBeTruthy()
        expect(welcomeContainerHeader.text()).toBe('Welcome to the planet of Lengaburu')

        let welcomeContainerBody1 = welcomeComponentWrapper.find('#welcomeContainerBody1')
        expect(welcomeContainerBody1.exists()).toBeTruthy()
        expect(welcomeContainerBody1.text()).toBe('After the recent war with neighbouring planet Falicornia, King Shan has exiled the Queen of Falicornia for 15 years. Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she will be exiled for another 15 years....')

        let welcomeContainerBody2 = welcomeComponentWrapper.find('#welcomeContainerBody2')
        expect(welcomeContainerBody2.exists()).toBeTruthy()
        expect(welcomeContainerBody2.text()).toBe('King Shan has received intelligence that Al Falcone is in hiding in one of these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin & Pingasor. However he has limited resources at his disposal & can send his army to only 4 of these planets. Your task is to help King Shan find Al Falcone.')

        let welcomeFindFalconeButton = welcomeComponentWrapper.find('#welcomeFindFalconeButton')
        expect(welcomeFindFalconeButton.exists()).toBeTruthy()

    })
})