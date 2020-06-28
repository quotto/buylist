import React,{useState,useEffect} from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createMenu } from './graphql/mutations'
import crypto from 'crypto'

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
           <p>{notice}</p>
          <input type="text"  value={title} onChange={changeTitle} placeholder='メニューの名前を入力'/>
          <p>買うもの</p>
           {
               materials.map((value,index)=>(
                   <div key={index}><input key={index} type="text" value={value} onChange={(e) => updateMaterials(e, index)} /></div>
               ))
           }
          <div><button onClick={addMaterials}>追加</button></div>
          <div><button onClick={addMenu}>登録</button></div>
       </div>
   ) 
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
}

export default Add