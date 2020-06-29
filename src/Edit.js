import React,{useState,useEffect} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { updateMenu ,deleteMenu} from './graphql/mutations'
import { useParams } from 'react-router-dom'
import crypto from 'crypto'
import styles from './styles'
import { Button } from '@material-ui/core'
import MenuInput from './MenuInput'

function Edit(props) {
   const [title,setTitle]  = useState('')
   const [materials,setMaterials] = useState([])
   const [notice,setNotice] = useState('')
   const {id} = useParams()

   useEffect(()=>{
        setTitle(props.location.state.menu.name)
        const materials = props.location.state.menu.materials.map(material=>{
            return material.name
        })
        setMaterials(materials)
   },[])

    function changeTitle(event) {
        setTitle(event.target.value)
    }

    function addMaterials() {
        const new_materials = Object.assign([],materials);
        new_materials.push('')
        setMaterials(new_materials)
    }

    function deleteMaterials(target_index) {
        const updated_materials = materials.filter((value,index)=>{
           return target_index != index 
        })
        setMaterials(updated_materials)
    }

    function updateMaterials(event,index) {
        const updated_materials = Object.assign([],materials)
        updated_materials[index] = event.target.value
        setMaterials(updated_materials)
    }

    async function requestDelete() {
        try {
            const result = await API.graphql(graphqlOperation(deleteMenu,{input: {id: id}}))
            
            console.log(result)
            setNotice('削除しました')
        } catch(err) {
            console.error(err)
            setNotice('削除に失敗しました')
        }
    }

    async function requestUpdate() {
        const varibale_materials = []
        for(const value of materials) {
            if(typeof(value)!='undefined' && value.length > 0) {
                const hash = crypto.createHash('sha256').update(value).digest('hex')
                varibale_materials.push({hash: hash,name: value})
            }
        }
        if(Object.keys(varibale_materials).length > 0 && title.length > 0) {
            try {
                const result = await API.graphql(graphqlOperation(updateMenu,{input: {id: id, name: title,materials:varibale_materials}}))
                console.log(result)
                setNotice('更新しました')
            } catch(err) {
                console.error(err)
                setNotice('更新に失敗しました')
            }
        }
    }
   return (
       <div style={styles.container}>
           <div style={styles.main}>
               {/* <p>{notice}</p>
               <input type="text" value={title} onChange={changeTitle} placeholder='メニューの名前を入力' />
               <p>買うもの</p>
               {
                   materials.map((value, index) => (
                       <div key={index} style={ListStyles.material}><input key={index} type="text" value={value} onChange={(e) => updateMaterials(e, index)} /><button onClick={(e) => deleteMaterials(index)} >削除</button></div>
                   ))
               }
               <div ><button onClick={addMaterials}>追加</button></div>
           </div> */}
               <MenuInput notice={notice} deleteMaterials={deleteMaterials} updateMaterials={updateMaterials} changeTitle={changeTitle} materials={materials} title={title} addMaterials={addMaterials} />
               <div style={styles.footer}>
                   <Button style={ListStyles.footerButton} onClick={requestUpdate} variant="contained" color="primary">更新</Button>
                   <Button style={ListStyles.footerButton} onClick={requestDelete} variant="contained" color="secondary">削除</Button>
               </div>
            </div>
       </div>
   ) 
}

const ListStyles = {
  footerButton: { width: '40%', margin: '0 5%' }
}

export default Edit