
import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
Enzyme.configure({adapter: new EnzymeAdapter()})
import {act} from 'react-dom/test-utils'

import React from 'react'
import BuyList from './BuyList'

describe("ListView",()=>{
    it("Nothing amount",()=>{
        let wrapper = null
        act(()=>{
            wrapper = mount(<BuyList location={
                {state: {targets: [
                    {
                        name: "メニュー1",
                        materials: [{
                            hash: "hash001",
                            name: "豚こま"
                        },
                            {
                                hash: "hash002",
                                name: "ネギ"
                            }
                        ]
                    },
                    {
                        name: "メニュー2",
                        materials: [
                            {
                                hash: "hash001",
                                name: "豚こま"
                            },
                            {
                                hash: "hash003",
                                name: "納豆"
                            }
                        ]
                    }
                ]}}}/>)
        })
        wrapper.update()
        expect(wrapper.find("ul").find("li").length).toBe(3)
        expect(wrapper.find("ul").find("li").at(0).text()).toBe("豚こま")
        expect(wrapper.find("ul").find("li").at(1).text()).toBe("ネギ")
        expect(wrapper.find("ul").find("li").at(2).text()).toBe("納豆")
    })
    it("With amount",()=>{
        let wrapper = null
        act(()=>{
            wrapper = mount(<BuyList location={
                {state: {targets: [
                    {
                        name: "メニュー1",
                        materials: [
                            {
                                hash: "hash001",
                                name: "豚こま",
                                amount: {
                                    value: 400,
                                    unit: "GRAM"
                                }
                            },
                            {
                                hash: "hash002",
                                name: "ネギ",
                            }
                        ]
                    },
                    {
                        name: "メニュー2",
                        materials: [
                            {
                                hash: "hash001",
                                name: "豚こま",
                                amount: {
                                    value: 300,
                                    unit: "GRAM"
                                }
                            },
                            {
                                hash: "hash003",
                                name: "納豆",
                                amount: {
                                    value: 2,
                                    unit: "BAG"
                                }
                            }
                        ]
                    },
                    {
                        name: "メニュー3",
                        materials: [
                            {
                                hash: "hash002",
                                name: "ネギ",
                                amount: {
                                    value: 1,
                                    unit: "HON"
                                }
                            },
                            {
                                hash: "hash003",
                                name: "納豆",
                                amount: {
                                    value: 1.5,
                                    unit: "PACK"
                                }
                            }
                        ]
                    }
                ]}}}/>)
        })
        wrapper.update()
        expect(wrapper.find("ul").find("li").length).toBe(4)
        expect(wrapper.find("ul").find("li").at(0).text()).toBe("豚こま\u00a0700g")
        expect(wrapper.find("ul").find("li").at(1).text()).toBe("ネギ\u00a01本")
        expect(wrapper.find("ul").find("li").at(2).text()).toBe("納豆\u00a02袋")
        expect(wrapper.find("ul").find("li").at(3).text()).toBe("納豆\u00a01.5パック")
    })
})