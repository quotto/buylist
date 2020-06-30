import React,{useState,useEffect} from 'react'
import styles from './styles'
import  BuyTable from './BuyTable'
import {Button} from '@material-ui/core'

function BuyList(props) {
    const [materials_map,setMaterials] = useState({})
    const [view,setView] = useState("list")

    useEffect(()=>{
        console.log("use effect@BuyList")
        const distinct_materials = {}
        for(const menu of props.location.state.targets) {
            for(const materials of menu.materials) {
                distinct_materials[materials.hash] = materials.name
            }
        }
        setMaterials(distinct_materials)
    },[])

    function setViewMode() {
        const viewmode = view === "list" ? "grid" : "list"
        setView(viewmode)
    }

    const Component = view === "list" ? 
                <ul>
                    {Object.keys(materials_map).map((key, index) => (
                        <li key={key}>{materials_map[key]}</li>
                    ))}
                </ul>
        : <BuyTable menus={props.location.state.targets} materials={materials_map} /> 
    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <h2>買うものリスト</h2>
                {Component}
            </div>
            <div style={styles.footer}>
                <Button style={BuyListStyles.footerButton} onClick={setViewMode} variant="contained" color="primary">切り替え</Button>
            </div>
        </div>
    )
}

const BuyListStyles = {
  footerButton: { widh: '40%' }
}

export default BuyList