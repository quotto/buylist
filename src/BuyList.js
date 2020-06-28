import React,{useState,useEffect} from 'react'

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
            <h2>買うものリスト</h2>
            <ul>
                {Object.keys(materials_map).map((key,index)=>(
                    <li>{materials_map[key]}</li>
                ))}
            </ul>
        </div>
    )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
}


export default BuyList