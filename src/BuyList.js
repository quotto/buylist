import React,{useState,useEffect} from 'react'
import styles from './styles'

function BuyList(props) {
    const [materials_map,setMaterials] = useState({})

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
    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <h2>買うものリスト</h2>
                <ul>
                    {Object.keys(materials_map).map((key, index) => (
                        <li key={key}>{materials_map[key]}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BuyList