import React, { useState, useContext, useEffect } from 'react';
import {launchCamera, launchImageLibrary}  from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import s3 from '../utils/bucket'
import styles from '../styles/layer1'
import Button from '../components/button'

import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Alert,
    Image
  } from 'react-native';

const  HomeScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [url, setUrl] = useState([]);

    const selectImage = ( ) => {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              console.log(response.assets[0].uri)
              setImage(response.assets[0].uri);
            }
        });
  
    }

    const uploadImage = async () => {
    //   const filename = "testing"
    //   const signedUrlExpireSeconds = 60 * 1500;

    //   const url = await s3.getSignedUrlPromise("putObject", {
    //     Bucket: config.bucket,
    //     Key: filename,
    //     ContentType: "image/jpeg",
    //     Expires: signedUrlExpireSeconds,
    //     ACL: 'public-read'
    //   })
    //   console.log(url)
    //   try {
    //     const res = await fetch(image);
    //     const body = await res.blob();
    //     console.log(body)
    //     const result = await fetch(url, {
    //       method: 'PUT',
    //       body: body,
    //    });
    //    console.log('result:', result);
    //   } catch (error) {
    //  console.log('error upload :', error);
    // }
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.buttonContainer} onPress={selectImage}>
      <Text style={styles.text}>Select Image</Text>
    </TouchableOpacity>
    {
    image && <TouchableOpacity style={styles.buttonContainer} onPress={uploadImage}>
    <Text style={styles.text}>Upload image</Text>
    </TouchableOpacity>
    }
    {
    image && <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Screen2')}>
      <Text style={styles.text}>Next</Text>
    </TouchableOpacity>
    }
    </View>

  );
};

export default HomeScreen;
