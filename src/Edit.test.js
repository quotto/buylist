import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

jest.mock('aws-amplify')
import { API, graphqlOperation } from 'aws-amplify'

API.graphql.mockImplementation(async ()=>{
    return {}
})
graphqlOperation.mockImplementation((query, params)=>{
})

jest.mock('react-router-dom',()=>({
    useParams: ()=>({
        id: "id001"
    })
}))

import React from 'react'
import Edit from './Edit'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("addMenu",()=>{
    beforeEach(()=>{
        graphqlOperation.mockClear()
    })
    it("Init",()=>{
        const wrapper = mount(<Edit {...{location: {state: {menu: {
            name: "テスト",
            materials: [{
                name: "材料1"
            },
            {
                name: "材料2",
                amount: {
                    value: "",
                    unit: ""
                }
            },
            {
                name: "材料3",
                amount: {
                    value: 400,
                    unit: "GRAM"
                }
            },
            {
                name: "材料3",
                amount: null
            },
            {
                name: "材料3",
                amount: {
                    value: null
                }
            },
            {
                name: "材料3",
                amount: {
                    unit: "GRAM"
                }
            },
            {
                name: "材料3",
                amount: {
                    value: "10",
                    unit: null
                }
            },
            {
                name: "材料3",
                amount: {
                    value: "10"
                }
            },
        ]
        }}}}} />)
        expect(wrapper.find('.title').hostNodes().find('input').props().value).toBe("テスト")
        expect(wrapper.find('.inputMaterialName').hostNodes().at(0).find('input').props().value).toBe("材料1")
        expect(wrapper.find('.inputAmount').hostNodes().at(0).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(0).find('input').props().value).toBe("")

        expect(wrapper.find('.inputMaterialName').hostNodes().at(1).find('input').props().value).toBe("材料2")
        expect(wrapper.find('.inputAmount').hostNodes().at(1).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(1).find('input').props().value).toBe("")

        expect(wrapper.find('.inputMaterialName').hostNodes().at(2).find('input').props().value).toBe("材料3")
        expect(wrapper.find('.inputAmount').hostNodes().at(2).find('input').props().value).toBe(400)
        expect(wrapper.find('.inputUnit').hostNodes().at(2).find('input').props().value).toBe("GRAM")

        expect(wrapper.find('.inputAmount').hostNodes().at(3).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(3).find('input').props().value).toBe("")

        expect(wrapper.find('.inputAmount').hostNodes().at(4).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(4).find('input').props().value).toBe("")

        expect(wrapper.find('.inputAmount').hostNodes().at(5).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(5).find('input').props().value).toBe("")

        expect(wrapper.find('.inputAmount').hostNodes().at(6).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(6).find('input').props().value).toBe("")

        expect(wrapper.find('.inputAmount').hostNodes().at(7).find('input').props().value).toBe("")
        expect(wrapper.find('.inputUnit').hostNodes().at(7).find('input').props().value).toBe("")
    })
    it("Change and requestUpdate",()=>{
        const wrapper = mount(<Edit {...{location: {state: {menu: {
            name: "テスト",
            materials: [{
                name: "材料1"
            },
            {
                name: "材料2",
                amount: {
                    value: "",
                    unit: ""
                }
            },
            {
                name: "材料3",
                amount: {
                    value: "400",
                    unit: "GRAM"
                }
            },
            ]
        } } } }} />) 
        
        wrapper.find('.title').hostNodes().find('input').at(0).simulate('change',{target:{value: "テストメニュー"}})
        wrapper.find('.inputMaterialName').hostNodes().at(0).find('input').simulate('change',{target:{value: "テスト"}})
        wrapper.find('.inputAmount').hostNodes().at(0).find('input').simulate('change',{target:{value: 400}})
        wrapper.find('.inputUnit').hostNodes().at(0).find('input').simulate('change',{target:{value: "GRAM"}})

        wrapper.find('.inputMaterialName').hostNodes().at(1).find('input').simulate('change',{target:{value: "テスト2"}})
        wrapper.find('.inputAmount').hostNodes().at(1).find('input').simulate('change',{target:{value: 1.5}})
        wrapper.find('.inputUnit').hostNodes().at(1).find('input').simulate('change',{target:{value: "PACK"}})

        wrapper.find('.inputMaterialName').hostNodes().at(2).find('input').simulate('change',{target:{value: "テスト3"}})
        wrapper.find('.inputAmount').hostNodes().at(2).find('input').simulate('change',{target:{value: ""}})
        wrapper.find('.inputUnit').hostNodes().at(2).find('input').simulate('change',{target:{value: ""}})

       wrapper.find('#updateButton').hostNodes().find('button').at(0).simulate('click')

        expect(graphqlOperation.mock.calls.length).toBe(1)
        expect(graphqlOperation.mock.calls[0][1].input.id).toBe("id001")

        expect(graphqlOperation.mock.calls[0][1].input.name).toBe("テストメニュー")

        expect(graphqlOperation.mock.calls[0][1].input.materials.length).toBe(3)
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].name).toBe("テスト")
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].amount.value).toBe(400)
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].amount.unit).toBe("GRAM")
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].name).toBe("テスト2")
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].amount.value).toBe(1.5)
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].amount.unit).toBe("PACK")
        expect(graphqlOperation.mock.calls[0][1].input.materials[2].name).toBe("テスト3")
        expect(graphqlOperation.mock.calls[0][1].input.materials[2].amount).toBeUndefined()

    })
})