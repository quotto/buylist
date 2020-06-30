import React,{useState} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMenu } from './graphql/mutations'
import crypto from 'crypto'
import styles from './styles'
import { TextField,Button,IconButton } from '@material-ui/core'
import ClearButton  from '@material-ui/icons/Clear'
import MenuInput from './MenuInput'

function Add() {
    const [title,setTitle] = useState('')
    const [materials,setMaterials] = useState(['','','','',''])
    const [notice,setNotice] = useState('')

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

    async function addMenu() {
        const varibale_materials = []
        for(const value of materials) {
            if(typeof(value)!='undefined' && value.length > 0) {
                const hash = crypto.createHash('sha256').update(value).digest('hex')
                varibale_materials.push({hash: hash,name: value})
            }
        }
        // call graphql api
        if(Object.keys(varibale_materials).length > 0 && title.length > 0) {
            try {
                const result = await API.graphql(graphqlOperation(createMenu,{input: {name: title,materials:varibale_materials}}))
                console.log(result)
                setNotice('登録しました')
            } catch(err) {
                console.error(err)
                setNotice('登録に失敗しました')
            }
        }
    }
   return (
       <div style={styles.container}>
           <div style={styles.main}>
                <MenuInput notice={notice} deleteMaterials={deleteMaterials} updateMaterials={updateMaterials} changeTitle={changeTitle} materials={materials} title={title} addMaterials={addMaterials} />
           </div>
           <div style={styles.footer}>
                <Button style={AddStyles.footerButton} variant="contained" color="primary" onClick={addMenu}>登録</Button>
           </div>
        </div>
   ) 
}

const AddStyles = {
  material: {  marginBottom: 15 },
  materialInput: { verticalAlign: "middle"},
  footerButton: { widh: '40%' }
}

export default Add