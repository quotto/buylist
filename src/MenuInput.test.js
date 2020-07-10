import MenuInput,{convertToInputMaterial} from './MenuInput'
import crypto from 'crypto'
import Enzyme, { shallow,mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import React from 'react'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("convertToInputMaterial",()=>{
    test("valid data", () => {
        const result = convertToInputMaterial([
            {
                name: "テスト"
            },
            {
                name: "テスト2",
                amount: "400",
                unit: "GRAM"
            },
            {
                name: "テスト3",
                amount: "1.5",
                unit: "PACK"
            },
            {
                name: "テスト4",
                amount: 400,
                unit: "GRAM"
            },
            {
                name: "テスト5",
                amount: 1.5,
                unit: "PACK"
            },
        ])

        expect(result.length).toBe(5)
        expect(result[0].hash).toBe(crypto.createHash("sha256").update("テスト").digest("hex"))
        expect(result[0].name).toBe("テスト")

        expect(result[1].hash).toBe(crypto.createHash("sha256").update("テスト2").digest("hex"))
        expect(result[1].name).toBe("テスト2")
        expect(result[1].amount.value).toBe(400)
        expect(result[1].amount.unit).toBe("GRAM")

        expect(result[2].hash).toBe(crypto.createHash("sha256").update("テスト3").digest("hex"))
        expect(result[2].name).toBe("テスト3")
        expect(result[2].amount.value).toBe(1.5)
        expect(result[2].amount.unit).toBe("PACK")

        expect(result[3].name).toBe("テスト4")
        expect(result[3].amount.value).toBe(400)
        expect(result[3].amount.unit).toBe("GRAM")

        expect(result[4].name).toBe("テスト5")
        expect(result[4].amount.value).toBe(1.5)
        expect(result[4].amount.unit).toBe("PACK")
    })
    test("invalid amount", () => {
        const result = convertToInputMaterial([
            {
                name: "テスト",
                amount: "",
                unit: "GRAM"
            },
            {
                name: "テスト2",
                amount: "400",
                unit: ""
            },
            {
                name: "テスト2",
                amount: "400",
            },
            {
                name: "テスト2",
                amount: "400.",
                unit: "GRAM"
            },
            {
                name: "テスト2",
                amount: "-10",
                unit: "GRAM"
            },
            {
                name: "テスト2",
                amount: -10,
                unit: "GRAM"
            },
            {
                name: "テスト2",
                amount: "1a",
                unit: "GRAM"
            }
        ])

        expect(result.length).toBe(7)
        expect(result[0].amount).toBeUndefined()
        expect(result[1].amount).toBeUndefined()
        expect(result[2].amount).toBeUndefined()
        expect(result[3].amount).toBeUndefined()
        expect(result[4].amount).toBeUndefined()
        expect(result[5].amount).toBeUndefined()
        expect(result[6].amount).toBeUndefined()
    })
})

describe("MenuInput",()=>{
    const setTitle = jest.fn()
    const setMaterials = jest.fn()
    const setNotice = jest.fn()
    it("render from edit",()=>{
        const wrapper = mount(<MenuInput 
            setTitle={setTitle} 
            setMaterials={setMaterials}
            title="メニュー1"
            materials={
                [{
                    hash: "hash001",
                    name: "材料1",
                    amount: "",
                    unit: ""
                }, {
                    hash: "hash002",
                    name: "材料2",
                    amount: "400",
                    unit: "GRAM"
                }, {
                    hash: "hash003",
                    name: "材料3",
                    amount: 400,
                    unit: "GRAM"
                }, {
                    hash: "hash004",
                    name: "材料4",
                    amount: 1.5,
                    unit: "HON"
                },
                ]
            }
            notice=""
            setNotice={setNotice}
             />)
       expect(wrapper.find(".title").hostNodes().find("input").props().value).toBe("メニュー1")
       expect(wrapper.find(".inputMaterialName").hostNodes().length).toBe(4)
       expect(wrapper.find(".inputMaterialName").hostNodes().at(0).find("input").props().value).toBe("材料1")
       expect(wrapper.find(".inputAmount").hostNodes().at(0).find("input").props().value).toBe("")
       expect(wrapper.find(".inputUnit").hostNodes().at(0).find("input").props().value).toBe("")
       expect(wrapper.find(".inputMaterialName").hostNodes().at(1).find("input").props().value).toBe("材料2")
       expect(wrapper.find(".inputAmount").hostNodes().at(1).find("input").props().value).toBe("400")
       expect(wrapper.find(".inputUnit").hostNodes().at(1).find("input").props().value).toBe("GRAM")

       expect(wrapper.find(".inputMaterialName").hostNodes().at(2).find("input").props().value).toBe("材料3")
       expect(wrapper.find(".inputAmount").hostNodes().at(2).find("input").props().value).toBe(400)
       expect(wrapper.find(".inputUnit").hostNodes().at(2).find("input").props().value).toBe("GRAM")

       expect(wrapper.find(".inputMaterialName").hostNodes().at(3).find("input").props().value).toBe("材料4")
       expect(wrapper.find(".inputAmount").hostNodes().at(3).find("input").props().value).toBe(1.5)
       expect(wrapper.find(".inputUnit").hostNodes().at(3).find("input").props().value).toBe("HON")
    })
    it("change value",()=>{
        const setNotice=jest.fn()
        const wrapper = mount(<MenuInput 
            setTitle={setTitle} 
            setMaterials={setMaterials}
            title="メニュー1"
            materials = {
                [{
                    hash: "hash001",
                    name: "材料1",
                    amount: "",
                    unit: ""
                }, {
                    hash: "hash002",
                    name: "材料2",
                    amount: "400",
                    unit: "GRAM"
                }, {
                    hash: "hash003",
                    name: "材料3",
                    amount: "10.5",
                    unit: "GRAM"
                },
            ]
            }
            notice=""
            setNotice={setNotice}
             />)
        wrapper.find(".title").hostNodes().find("input").simulate("change",{target: {value: "メニュー11"}})
        wrapper.find(".inputMaterialName").hostNodes().at(0).find("input").simulate("change",{target: {value: "材料11"}})
        wrapper.find(".inputAmount").hostNodes().at(0).find("input").simulate("change",{target: {value: 10.5}})
        wrapper.find(".inputUnit").hostNodes().at(0).find("input").simulate("change",{target: {value: "PACK"}})
        wrapper.find(".inputAmount").hostNodes().at(1).find("input").simulate("change",{target: {value: ""}})
        wrapper.find(".inputUnit").hostNodes().at(1).find("input").simulate("change",{target: {value: ""}})
        wrapper.find(".inputAmount").hostNodes().at(2).find("input").simulate("change",{target: {value: 400}})
        wrapper.find(".inputUnit").hostNodes().at(2).find("input").simulate("change",{target: {value: "NUM"}})

        expect(setTitle.mock.calls.length).toBe(1)
        expect(setTitle.mock.calls[0][0]).toBe("メニュー11")
        expect(setMaterials.mock.calls.length).toBe(7)
        expect(setMaterials.mock.calls[0][0][0].name).toBe("材料11")
        expect(setMaterials.mock.calls[0][0][0].amount).toBe(10.5)
        expect(setMaterials.mock.calls[0][0][0].unit).toBe("PACK")
        expect(setMaterials.mock.calls[0][0][1].amount).toBe("")
        expect(setMaterials.mock.calls[0][0][1].unit).toBe("")
        expect(setMaterials.mock.calls[0][0][2].amount).toBe(400)
        expect(setMaterials.mock.calls[0][0][2].unit).toBe("NUM")
    })
})