import React,{useEffect,useState} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './styles'

function BuyTable(props) {
    const [rows,setRows] = useState([])
    useEffect(()=>{
        console.log(props)
        const rows = []
        for(const menu of props.menus) {
            rows.push(
                {
                    name: menu.name,
                    checked: Object.keys(props.materials).map(material_hash => {
                        return menu.materials.some((m) => {
                            return m.hash == material_hash
                        }) ? "○" : ""
                    })
                }
            )
        }
        console.log(rows)
        setRows(rows)
    },[props.materials])
    return (
                <TableContainer component={Paper}>
                    <Table arial-label="BuyTable">
                        <TableHead>
                            <TableRow>
                                <TableCell style={BuyTableStyles.tableCell}>メニュー</TableCell>
                                {Object.keys(props.materials).map((hash) => (
                                    <TableCell key={hash} style={BuyTableStyles.tableCell} >{props.materials[hash]}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell style={BuyTableStyles.tableCell} component="th" scope="row">{row.name}</TableCell>
                                    {row.checked.map((check, index) => (
                                        <TableCell key={row.name + "-" + index} style={BuyTableStyles.tableCell}>{check}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    )
}

const BuyTableStyles = {
    tableCell:  {wordBreak:"keep-all"}
}

export default BuyTable