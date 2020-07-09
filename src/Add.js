import React,{useState} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMenu } from './graphql/mutations'
import crypto from 'crypto'
import styles from './styles'
import { Button } from '@material-ui/core'
import MenuInput,{convertToInputMaterial} from './MenuInput'

function Add() {
    const [title,setTitle] = useState('')
    const [materials,setMaterials] = useState(initMaterials())
    const [notice,setNotice] = useState({status: "none", message: ""})

    function initMaterials() {
        const materials = []
        for(let i=0; i<5; i++) {
           materials.push({
               name: '',
               amount: '',
               unit: ''
           }) 
        }
        return materials
    }

    async function addMenu() {
        const varibale_materials = convertToInputMaterial(materials)
        if(varibale_materials.length > 0 && title.length > 0) {
            try {
                const result = await API.graphql(graphqlOperation(createMenu,{input: {name: title,materials:varibale_materials}}))
                console.log(result)
                setNotice({status: 'success',message: '登録しました'})
            } catch(err) {
                console.error(err)
                setNotice({status: 'error',message: '登録に失敗しました'})
            }
        }
    }
   return (
       <div style={styles.container}>
           <div style={styles.main}>
                <MenuInput 
                    notice={notice} 
                    setTitle={setTitle}
                    setMaterials={setMaterials}
                    setNotice={setNotice}
                    materials={materials} 
                    title={title} />
           </div>
           <div style={styles.footer}>
                <Button style={AddStyles.footerButton} variant="contained" color="primary" onClick={addMenu} id="registerButton">登録</Button>
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