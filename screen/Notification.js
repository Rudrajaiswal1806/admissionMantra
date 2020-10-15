import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Top from './Top';
import { ScrollView } from 'react-native-gesture-handler';

const Notification = () => {
    const [data, setData] = useState('');
    useEffect(() => {
        fetch('http://helixsmartlabs.in/app/dashboard/notice.php')
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);

            }).catch((error) => {
                console.log("Data fetching failed", error);
            })
    }, []);
    const renderer = ({ item, index }) => {
        return (
            <View style={{ borderColor: '#fff',borderRadius:10, marginHorizontal: 10,marginTop:15,padding:10,backgroundColor:'#fff' }}>
                <Text style={{ textAlign: 'left', color: 'black', fontWeight: 'bold', fontSize: 22 }}>{item.title}</Text>
                <Text style={{ textAlign: 'justify', color: 'black', fontWeight: 'bold', fontSize: 16 }}>{item.content}</Text>
                <Text style={{ textAlign: 'right', color: 'black', fontWeight: '800', fontSize: 14 }}>{item.dop}</Text>

            </View>
        )
    }
    return (
        <View style={{ marginTop: 30 }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.sno}
                renderItem={renderer}
            />
        </View>
    )
}
const styles = StyleSheet.create({

})
export default Notification;