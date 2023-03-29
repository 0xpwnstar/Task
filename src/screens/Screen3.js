import React, { useState, useContext, useEffect } from 'react';
import Picture from '../components/profile'
import styles from '../styles/layer1'
import {View, Text } from 'react-native'
import FormInput from '../components/FormInput';
import FormButton from '../components/button';
import { writeFile, readFile } from 'react-native-fs';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';



const Screen3 = ({route, navigation}) => {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [prevLongitude, setPrevLongitude] = useState(0);
    const [prevLatitude, setPrevLatitude] = useState(0);
    const [dist, setDist] = useState(0)
    const [miles, setMiles] = useState(0)
    const addToExcel = () => {
        var ws = XLSX.utils.json_to_sheet([{
            longitude,
            latitude
        }]);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,"Prova");
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
        var file = RNFS.DocumentDirectoryPath + '/file2.xlsx';
        console.log(file)
        writeFile(file, wbout, 'ascii').then((r)=>{}).catch((e)=>{});
    }
    const Calculate = () => {
        if(latitude && longitude){
            var p = 0.017453292519943295;
            var c = Math.cos;
            var a = 0.5 - c((latitude - prevLatitude) * p)/2 + c(prevLatitude * p) * c(latitude * p) * (1 - c((longitude - prevLongitude) * p))/2;
          
            setDist((12742 * Math.asin(Math.sqrt(a)).toFixed(5)))
        }
    }
    const toMiles = () => {  
        if(dist){
            setMiles((dist/0.6).toFixed(5))
        }
        return
    }
    const readExcel = async () => {
        var filePath;
        await RNFS.readDir(RNFS.DocumentDirectoryPath).then((f) => {
            f.forEach(element => {
                if (element["name"] == "file2.xlsx") {
                    filePath = element["path"]
                }
            });
        })
        if(!filePath) return ["",""]
        const excelFile = await RNFS.readFile(filePath,'ascii')
        const workbook = XLSX.read(excelFile, {type:'binary'})["Sheets"]
        return [workbook["Prova"]["A2"]["h"],workbook["Prova"]["B2"]["h"]]
    }
    useEffect(() => {
        const read = async () => {
            let values = await readExcel()
            setLongitude(values[0])
            setLatitude(values[1])
        }
        read()
        setPrevLongitude(route.params["longitude"])
        setPrevLatitude(route.params["latitude"])

    }, []);
    return(
    <View style={styles.columnContainer}>
    <Picture/>
    <FormInput value={""+longitude}
        placeholderText='longitude' onChangeText={x => (setLongitude(x))}
        autoCapitalize='none' keyboardType='numeric' autoCorrect={false}/>
    <FormInput value={""+latitude} placeholderText='latitude'
        onChangeText={x => (setLatitude(x))} autoCapitalize='none'
        keyboardType='numeric' autoCorrect={false}/>
    <FormButton buttonTitle='Save' onPress={
        () => {
            addToExcel()
        }}/>
    <View style = {{flexDirection: 'row',justifyContent: 'center'}}>
    <FormButton buttonTitle='Calculate' onPress={() => {
        Calculate()
    }}/>
    <FormButton buttonTitle={dist ? dist+'KM':'KM'} />
    </View>
    <View style = {{flexDirection: 'row-reverse',justifyContent: 'center'}}>
    <FormButton buttonTitle={miles ? miles+'Miles':'Miles'} onPress={() => {
        toMiles()
    }}/>
    </View>

    <View style = {{flexDirection: 'row-reverse',justifyContent: 'center',marginTop: 10}}>
    <FormButton buttonTitle='Back' onPress={() => navigation.navigate('Screen2')}/>
    </View>
    </View>
    )
}

export default Screen3