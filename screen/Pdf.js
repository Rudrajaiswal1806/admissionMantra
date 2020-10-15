import React, { useState, useEffect } from 'react'
import { View, FlatList, Text,ActivityIndicator } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { usePreventScreenCapture } from 'expo-screen-capture';

const Pdf = ({ navigation, route }) => {
  const { thread } = route.params;
  const [data, setData] = useState('');
  const [partdata, setPartdata] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const Listener = fetch(`http://theadmissionmantra.in/pdf.php?id=${thread}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setData(...responseJson);
      }).catch((error) => {
        console.log("Data fetching failed");
      });
      setTimeout(()=>{
     setLoading(false)
      },2000)
  }, []);
  console.log(data.url);
  usePreventScreenCapture();
  if (loading) {
    return(
      <View style={{ justifyContent: "center", flex: 1 }}>
      <ActivityIndicator size={100} color={'#5B86E5'} style={{ alignSelf: 'center' }} />
  </View>
    )
  }
  return (

    <PDFReader
      source={{
        uri: `${data.url}`
      }}
    />
  );
}
export default Pdf;