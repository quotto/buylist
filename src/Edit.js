import React,{useState,useEffect} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { updateMenu ,deleteMenu} from './graphql/mutations'
import { useParams } from 'react-router-dom'
import crypto from 'crypto'
import styles from './styles'
import { Button } from '@material-ui/core'
import MenuInput,{convertToInputMaterial} from './MenuInput'


function Edit(props) {
   const [title,setTitle]  = useState('')
   const [materials,setMaterials] = useState([])
   const [notice,setNotice] = useState({status: 'none', message: ''})
   const {id} = useParams()

   useEffect(()=>{
        setTitle(props.location.state.menu.name)
        const materials = props.location.state.menu.materials.map(material=>{
            const valid_amount = material.amount && material.amount.value && material.amount.unit
            return {
                name: material.name,
                amount:  valid_amount ? material.amount.value : "",
                unit: valid_amount ? material.amount.unit : ""
            }
        })
        setMaterials(materials)
   },[])

    async function requestDelete() {
        try {
            const result = await API.graphql(graphqlOperation(deleteMenu,{input: {id: id}}))
            
            console.log(result)
            setNotice({status: 'warning', message: '削除しました'})
        } catch(err) {
            console.error(err)
            setNotice({status: 'error',message: '削除に失敗しました'})
        }
    }

    async function requestUpdate() {
        const varibale_materials = convertToInputMaterial(materials)
        if(Object.keys(varibale_materials).length > 0 && title.length > 0) {
            try {
                const result = await API.graphql(graphqlOperation(updateMenu,{input: {id: id, name: title,materials:varibale_materials}}))
                console.log(result)
                setNotice({status: 'success',message: '更新しました'})
            } catch(err) {
                console.error(err)
                setNotice({status: 'error',message: '更新に失敗しました'})
            }
        }
    }
   return (
       <div style={styles.container}>
           <div style={styles.main}>
               <MenuInput 
                notice={notice} 
                materials={materials} 
                title={title} 
                setTitle={setTitle}
                setMaterials={setMaterials}
                setNotice={setNotice}/>
               <div style={styles.footer}>
                   <Button style={ListStyles.footerButton} onClick={requestUpdate} variant="contained" color="primary" id="updateButton">更新</Button>
                   <Button style={ListStyles.footerButton} onClick={requestDelete} variant="contained" color="secondary" id="deleteButton">削除</Button>
               </div>
            </div>
       </div>
   ) 
}

const ListStyles = {
  footerButton: { width: '40%', margin: '0 5%' }
}

export default Edit