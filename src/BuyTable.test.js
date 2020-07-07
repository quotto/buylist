import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new EnzymeAdapter()})

import React from 'react'
import BuyTable from './BuyTable'
import { act } from 'react-dom/test-utils'

describe("init view",()=>{
    it("without amount",()=>{
        let wrapper = null
        act(()=>{
           wrapper = mount(<BuyTable 
                menus={
                    [
                        {
                            name: "メニュー1",
                            materials: [
                                {
                                    hash: "0001",
                                    name: "豚こま肉"
                                },
                                {
                                    hash: "0002",
                                    name: "ネギ"
                                }
                            ]
                        },
                        {
                            name: "メニュー2",
                            materials: [
                                {
                                    hash: "0001",
                                    name: "豚こま肉"
                                },
                                {
                                    hash: "0003",
                                    name: "大根",
                                    amount: {}
                                }
                            ]
                        },
                        {
                            name: "メニュー3",
                            materials: [
                                {
                                    hash: "0001",
                                    name: "豚こま肉",
                                    amount: {
                                        unit: "GRAM"
                                    }
                                },
                                {
                                    hash: "0003",
                                    name: "大根",
                                    amount: {
                                        value: "400"
                                    }
                                }
                            ]
                        }
                    ]
                }

                materials = {
                    {
                        "0003": {name: "大根"},
                        "0001": {name: "豚こま肉"},
                        "0002": {name: "ネギ"},
                    }
                }
                />) 
        })
        wrapper.update()
        expect(wrapper.find("tr.tableHeaderRow").find("th").length).toBe(4)
        // 材料名のヘッダはprops.materialsの順
        expect(wrapper.find("tr.tableHeaderRow").find("th").at(1).text()).toBe("大根")
        expect(wrapper.find("tr.tableHeaderRow").find("th").at(2).text()).toBe("豚こま肉")
        expect(wrapper.find("tr.tableHeaderRow").find("th").at(3).text()).toBe("ネギ")

        // メニュー行はprops.menusの順
        expect(wrapper.find("tr.tableBodyRow").length).toBe(3)
        expect(wrapper.find("tr.tableBodyRow").at(0).find("th").at(0).text()).toBe("メニュー1")
        expect(wrapper.find("tr.tableBodyRow").at(0).find("td").at(0).text()).toBe("")
        expect(wrapper.find("tr.tableBodyRow").at(0).find("td").at(1).text()).toBe("○")
        expect(wrapper.find("tr.tableBodyRow").at(0).find("td").at(2).text()).toBe("○")

        expect(wrapper.find("tr.tableBodyRow").at(1).find("th").at(0).text()).toBe("メニュー2")
        expect(wrapper.find("tr.tableBodyRow").at(1).find("td").at(1).text()).toBe("○")
        expect(wrapper.find("tr.tableBodyRow").at(1).find("td").at(0).text()).toBe("○")
        expect(wrapper.find("tr.tableBodyRow").at(1).find("td").at(2).text()).toBe("")

        expect(wrapper.find("tr.tableBodyRow").at(2).find("th").at(0).text()).toBe("メニュー3")
        expect(wrapper.find("tr.tableBodyRow").at(2).find("td").at(0).text()).toBe("○")
        expect(wrapper.find("tr.tableBodyRow").at(2).find("td").at(1).text()).toBe("○")
        expect(wrapper.find("tr.tableBodyRow").at(2).find("td").at(2).text()).toBe("")
    })
    it("with amount",()=>{
        let wrapper = null
        act(()=>{
           wrapper = mount(<BuyTable 
                menus={
                    [
                        {
                            name: "メニュー1",
                            materials: [
                                {
                                    hash: "0001",
                                    name: "豚こま肉",
                                    amount: {
                                        value: 400,
                                        unit: "GRAM"
                                    }
                                },
                                {
                                    hash: "0002",
                                    name: "ネギ",
                                    amount: {
                                        value: 1,
                                        unit: "HON"
                                    }
                                }
                            ]
                        },
                        {
                            name: "メニュー2",
                            materials: [
                                {
                                    hash: "0001",
                                    name: "豚こま肉"
                                },
                                {
                                    hash: "0003",
                                    name: "大根",
                                    amount: {
                                        value: 1.5,
                                        unit: "NUM"
                                    }
                                }
                            ]
                        },
                        {
                            name: "メニュー3",
                            materials: [
                                {
                                    hash: "0001",
                                    name: "豚こま肉",
                                    amount: {
                                        value: 300,
                                        unit: "GRAM"
                                    }
                                },
                                {
                                    hash: "0003",
                                    name: "大根",
                                    amount: {
                                        value: 400,
                                        unit: "PACK"
                                    }
                                }
                            ]
                        }
                    ]
                }

                materials = {
                    {
                        "0003": {name: "大根"},
                        "0001": {name: "豚こま肉"},
                        "0002": {name: "ネギ"},
                    }
                }
                />) 
        })
        wrapper.update()
        expect(wrapper.find("tr.tableHeaderRow").find("th").length).toBe(4)
        // 材料名のヘッダはprops.materialsの順
        expect(wrapper.find("tr.tableHeaderRow").find("th").at(1).text()).toBe("大根")
        expect(wrapper.find("tr.tableHeaderRow").find("th").at(2).text()).toBe("豚こま肉")
        expect(wrapper.find("tr.tableHeaderRow").find("th").at(3).text()).toBe("ネギ")

        expect(wrapper.find("tr.tableBodyRow").length).toBe(3)

        expect(wrapper.find("tr.tableBodyRow").at(0).find("th").at(0).text()).toBe("メニュー1")
        expect(wrapper.find("tr.tableBodyRow").at(0).find("td").at(0).text()).toBe("")
        expect(wrapper.find("tr.tableBodyRow").at(0).find("td").at(1).text()).toBe("400g")
        expect(wrapper.find("tr.tableBodyRow").at(0).find("td").at(2).text()).toBe("1本")

        expect(wrapper.find("tr.tableBodyRow").at(1).find("th").at(0).text()).toBe("メニュー2")
        expect(wrapper.find("tr.tableBodyRow").at(1).find("td").at(0).text()).toBe("1.5個")
        expect(wrapper.find("tr.tableBodyRow").at(1).find("td").at(1).text()).toBe("○")
        expect(wrapper.find("tr.tableBodyRow").at(1).find("td").at(2).text()).toBe("")

        expect(wrapper.find("tr.tableBodyRow").at(2).find("th").at(0).text()).toBe("メニュー3")
        expect(wrapper.find("tr.tableBodyRow").at(2).find("td").at(0).text()).toBe("400パック")
        expect(wrapper.find("tr.tableBodyRow").at(2).find("td").at(1).text()).toBe("300g")
        expect(wrapper.find("tr.tableBodyRow").at(2).find("td").at(2).text()).toBe("")
    })

    it("nothing props data",()=>{
        let wrapper = null
        act(()=>{
            wrapper = mount(<BuyTable menus={[]} materials={{}}/>)
        })
        wrapper.update()
        expect(wrapper.find("tr.tableHeaderRow").find("th").length).toBe(1)
        expect(wrapper.find("tr.tableBodyRow").length).toBe(0)
    })
})