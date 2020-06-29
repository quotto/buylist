
import React from 'react'
import { TextField,Button,IconButton } from '@material-ui/core'
import ClearButton  from '@material-ui/icons/Clear'
import styles from './styles'

function MenuInput(props) {
    const {notice,addMaterials,deleteMaterials,updateMaterials,changeTitle,materials,title} = props
    return(
           <div>
               <p>{notice}</p>
               <TextField value={title} onChange={changeTitle} variant='filled' label='メニューの名前を入力' size="small" />
               <p>買うもの</p>
               {
                   materials.map((value, index) => (
                       <div style={MenuStyles.material} key={index}>
                           <TextField key={index} value={value} onChange={(e) => updateMaterials(e, index)} style={MenuStyles.materialInput} variant="outlined" size="small"/>
                           <IconButton onClick={(e) => deleteMaterials(index)} color="secondary">
                                <ClearButton />
                           </IconButton>
                        </div>
                   ))
               }
               <Button onClick={addMaterials} size="small" color="secondary" variant="outlined">追加</Button>
           </div>
    )
}

const MenuStyles = {
  material: {  marginBottom: 15 },
  materialInput: { verticalAlign: "middle"},
  footerButton: { widh: '40%' }
}

export default MenuInput