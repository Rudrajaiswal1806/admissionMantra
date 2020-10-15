import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Top from './Top';
import PDFReader from 'rn-pdf-reader-js'
import { usePreventScreenCapture } from 'expo-screen-capture';

const Exam = () => {
    const [data, setData] = useState('');
    usePreventScreenCapture();
    return (
        <PDFReader
        source={{
          uri: `http://theadmissionmantra.in/files/notice/pdf0.pdf`
        }}
      />
       
    )
}
export default Exam;
const styles = StyleSheet.create({
  
});
