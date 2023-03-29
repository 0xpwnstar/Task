import React, { useState, useEffect, useContext } from 'react';
import style from '../styles/layer1'
import {View} from 'react-native'
import {Image} from 'react-native'
import s3 from '../utils/bucket'
import {IdContext} from '../navigattion/IdProvider'

export default function Picture() {
  const [image, setImage] = useState(null);
  const {id} = useContext(IdContext)

  const addImage = () =>{
    var params = {Bucket: 'insta-chaitu', Key: id};
    var promise = s3.getSignedUrlPromise('getObject', params);
    promise.then(function(url) {
    console.log(url)
    setImage(url)
    }, function(err) { console.log(err) });
  };
  useEffect(() => {
    addImage()
  },[image])
  return (
            <View style={style.imageContainer}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                }
            </View>
  );
}