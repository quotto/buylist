import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

jest.mock('aws-amplify')
import { API, graphqlOperation } from 'aws-amplify'

API.graphql.mockImplementation(async ()=>{
    return {}
})
graphqlOperation.mockImplementation((query, params)=>{
})

import React from 'react'
import Add from './Add'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("addMenu",()=>{
    beforeEach(()=>{
        graphqlOperation.mockClear()
    })
    it("Contain Valid Amount",()=>{
        const wrapper = mount(<Add />)
        wrapper.find('.title').hostNodes().find('input').at(0).simulate('change',{target:{value: "テストメニュー"}})
        wrapper.find('.inputMaterialName').hostNodes().at(0).find('input').simulate('change',{target:{value: "テスト"}})
        wrapper.find('.inputAmount').hostNodes().at(0).find('input').simulate('change',{target:{value: "400"}})
        wrapper.find('.inputUnit').hostNodes().at(0).find('input').simulate('change',{target:{value: "GRAM"}})

        wrapper.find('.inputMaterialName').hostNodes().at(1).find('input').simulate('change',{target:{value: "テスト2"}})
        wrapper.find('.inputAmount').hostNodes().at(1).find('input').simulate('change',{target:{value: "1.5"}})
        wrapper.find('.inputUnit').hostNodes().at(1).find('input').simulate('change',{target:{value: "PACK"}})

       wrapper.find('#registerButton').hostNodes().find('button').at(0).simulate('click')

        expect(graphqlOperation.mock.calls.length).toBe(1)
        expect(graphqlOperation.mock.calls[0][1].input.name).toBe("テストメニュー")

        expect(graphqlOperation.mock.calls[0][1].input.materials.length).toBe(2)
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].name).toBe("テスト")
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].amount.value).toBe(400)
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].amount.unit).toBe("GRAM")
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].name).toBe("テスト2")
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].amount.value).toBe(1.5)
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].amount.unit).toBe("PACK")
    })
    it("Without Amount",()=>{
        const wrapper = mount(<Add />)
        wrapper.find('.title').hostNodes().find('input').simulate('change',{target:{value: "テストメニュー"}})
        wrapper.find('.inputMaterialName').hostNodes().at(0).find('input').simulate('change',{target:{value: "テスト"}})


       wrapper.find('#registerButton').hostNodes().find('button').simulate('click')

        expect(graphqlOperation.mock.calls.length).toBe(1)
        expect(graphqlOperation.mock.calls[0][1].input.name).toBe("テストメニュー")
        expect(graphqlOperation.mock.calls[0][1].input.materials.length).toBe(1)
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].name).toBe("テスト")
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].aomount).toBeUndefined()
    })
    it("Invalid Amount",()=>{
        const wrapper = mount(<Add />)
        // 数値入力形式の誤り
        wrapper.find('.title').hostNodes().find('input').simulate('change',{target:{value: "テストメニュー"}})
        wrapper.find('.inputMaterialName').hostNodes().at(0).find('input').simulate('change',{target:{value: "テスト1"}})
        wrapper.find('.inputAmount').hostNodes().at(0).find('input').simulate('change',{target:{value: "400."}})
        wrapper.find('.inputUnit').hostNodes().at(0).find('input').simulate('change',{target:{value: "GRAM"}})

        // 数字以外の入力
        wrapper.find('.inputMaterialName').hostNodes().at(1).find('input').simulate('change',{target:{value: "テスト2"}})
        wrapper.find('.inputAmount').hostNodes().at(1).find('input').simulate('change',{target:{value: "4a"}})
        wrapper.find('.inputUnit').hostNodes().at(1).find('input').simulate('change',{target:{value: "GRAM"}})


        // 単位が不足
        wrapper.find('.inputMaterialName').hostNodes().at(2).find('input').simulate('change',{target:{value: "テスト3"}})
        wrapper.find('.inputAmount').hostNodes().at(2).find('input').simulate('change',{target:{value: "400"}})
       wrapper.find('#registerButton').hostNodes().find('button').simulate('click')

        expect(graphqlOperation.mock.calls.length).toBe(1)
        expect(graphqlOperation.mock.calls[0][1].input.name).toBe("テストメニュー")
        expect(graphqlOperation.mock.calls[0][1].input.materials.length).toBe(3)

        expect(graphqlOperation.mock.calls[0][1].input.materials[0].name).toBe("テスト1")
        expect(graphqlOperation.mock.calls[0][1].input.materials[0].aomount).toBeUndefined()
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].name).toBe("テスト2")
        expect(graphqlOperation.mock.calls[0][1].input.materials[1].aomount).toBeUndefined()
        expect(graphqlOperation.mock.calls[0][1].input.materials[2].name).toBe("テスト3")
        expect(graphqlOperation.mock.calls[0][1].input.materials[2].aomount).toBeUndefined()
    })
})