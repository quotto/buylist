import React,{useState,useEffect} from 'react'
import styles from './styles'
import  BuyTable from './BuyTable'
import {Button} from '@material-ui/core'
import unit_map from './unit_map'

function BuyList(props) {
    const [materials_map,setMaterials] = useState({})
    const [view,setView] = useState("list")

    useEffect(()=>{
        const distinct_materials = {}
        for(const menu of props.location.state.targets) {
            for(const materials of menu.materials) {
                if(Object.keys(distinct_materials).indexOf(materials.hash) === -1 ) {
                    distinct_materials[materials.hash] = { name: materials.name, amount: {}}
                }

                if(materials.amount && materials.amount.value && materials.amount.unit) {
                    const current_amount_value = distinct_materials[materials.hash].amount[materials.amount.unit]
                    distinct_materials[materials.hash].amount[materials.amount.unit] = current_amount_value ? current_amount_value + materials.amount.value : materials.amount.value
                }
            }
        }
        setMaterials(distinct_materials)
    },[])

    function setViewMode() {
        const viewmode = view === "list" ? "grid" : "list"
        setView(viewmode)
    }

    function ListView() {
        const list = []
        for (const hash in materials_map) {
            if (Object.keys(materials_map[hash].amount).length > 0) {
                for (const unit in materials_map[hash].amount) {
                    list.push(<li key={hash+unit}>{materials_map[hash].name}&nbsp;{materials_map[hash].amount[unit]}{unit}</li>)
                }
            } else {
                list.push(<li key={hash}>{materials_map[hash].name}</li>)
            }
        }
        if (view === "list") {
            return <ul>
                {list}
            </ul>
        } else {
            return <BuyTable menus={props.location.state.targets} materials={materials_map} />
        }
    }


    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <h2>買うものリスト</h2>
                {ListView()}
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