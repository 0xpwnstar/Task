import React, { useState, createContext, useEffect } from 'react';
import Picture from '../components/profile'
import styles from '../styles/layer1'
import {View, TextInput, Text } from 'react-native'
import FormInput from '../components/FormInput';
import FormButton from '../components/button';
import { writeFile, readFile } from 'react-native-fs';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';


const Screen2 = ({navigation}) => {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const addToExcel = () => {
        var ws = XLSX.utils.json_to_sheet([{
            longitude,
            latitude
        }]);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,"Prova");
        const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});
        var file = RNFS.DocumentDirectoryPath + '/file1.xlsx';
        console.log(file)
        writeFile(file, wbout, 'ascii').then((r)=>{}).catch((e)=>{});
    }
    const readExcel = async () => {
        var filePath;
        await RNFS.readDir(RNFS.DocumentDirectoryPath).then((f) => {
            f.forEach(element => {
                if (element["name"] == "file1.xlsx") {
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
    <View style = {{flexDirection: 'row-reverse',justifyContent: 'center',marginTop: 50}}>
    <FormButton buttonTitle='Next' onPress={() => {
        (longitude && latitude) ? navigation.navigate('Screen3', {longitude, latitude}) : undefined
        }}/>
    <FormButton buttonTitle='Back' onPress={() => navigation.navigate('Home')}/>
    </View>
    </View>
    )
}

export default Screen2