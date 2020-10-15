import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Container,Icon} from 'native-base';
import Top from './Top';
import MarqueeText from 'react-native-marquee';

const Paper = ({ navigation, route }) => {
    const { thread } = route.params;
    const [data, setData] = useState('');
    const [notify, setNotify] = useState('');
    const { threadname } = route.params;
    const renderer = ({ item, index }) => {
        if (item.id != null) {
            return (
                <LinearGradient
                    colors={['#5B86E5','#36D1DC']}
                    style={styles.square}
                    start={[0, 0]}
                    end={[1,1]}
                >
                    <View style={{padding:10}}>
                        <Text style={styles.mock}>Mock Test</Text>
                        <Text style={styles.paper}>Paper !</Text>
                        <View style={styles.testLine}/>
                        <View style={{ borderColor: '#fff', borderWidth: 1, margin: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Pdf', { thread: item.id, })}>
                                <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize:15,paddingVertical:5}}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )
        } else {
            return (
                <Text style={{ textAlign: 'center', color: 'red', fontWeight: '800', fontSize: 22, justifyContent: 'center' }}>Nothing Here!</Text>
            )
        }

    }
    useEffect(() => {
        const Listener = fetch(`http://helixsmartlabs.in/app/dashboard/papers.php?tno=${thread}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                console.log(data);
            }).catch((error) => {
                console.log("Data fetching failed");
            });
        const anotherlistener = fetch(`http://helixsmartlabs.in/app/dashboard/notice.php`)
            .then((response) => response.json())
            .then((responseJson) => {
                setNotify(...responseJson)
            })
    }, []);
    return (
        <Container>
            <View style={styles.header}>
                <View style={styles.rowspaceBetween}>
                    <Icon  style={styles.back} name='keyboard-backspace' type='MaterialCommunityIcons' 
                           onPress={() =>navigation.goBack()}/>
                    <Text style={styles.headerText}>{threadname}</Text>
                </View>
                <View style={styles.rowspaceBetween}>
                    <View style={styles.notification}>
                        <Image style={styles.notification} source={require('../assets/notification.png')} />
                    </View>
                    <View>
                        <Icon  style={{fontSize:35}}  name='user' type='EvilIcons' />
                        <Text style={{textAlign:'center'}}>user</Text>
                    </View>
                </View>
            </View>
            <MarqueeText
                style={{ fontSize: 18,color:'red',marginVertical:15 }}
                duration={5000}
                marqueeOnStart
                loop
                marqueeDelay={1000}
                marqueeResetDelay={1000}
            >
                {notify.sno}:{notify.content}
            </MarqueeText>
            <View style={styles.banner}>
                <Image
                    source={require('../assets/banner.png')}
                    style={styles.logo}
                />
            </View>     
                <Text style={styles.mainText}>Choose Papers</Text>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderer}
                    numColumns={2}
                />
        </Container>
    );
}

const styles = StyleSheet.create({
    main: { height: "100%", backgroundColor: "white",paddingBottom:70 },
    nav: { marginTop: 26, flexDirection: "row", justifyContent: "space-between", marginLeft: 10, marginRight: 10, height: "10%", },
    logo: { width: "90%", height: "90%", borderRadius: 20, },
    banner: {
        justifyContent: "center", alignItems: "center",
        height: "25%", marginHorizontal:10, borderRadius: 20, backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    usrTxt: { fontSize:28, fontWeight: "bold" },
    notification: { width: 24, height: 24, padding: 10 },
    rightNotification: {
        width: 34, height: 34, alignItems: "center", justifyContent: "center", shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    body: {
        
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    header:{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginTop:'9%'},
    rowspaceBetween:{flexDirection:'row',justifyContent:'space-between'},
    back:{color:'#5BA8F5',alignSelf:'center'},
    headerText:{fontSize:20,fontWeight:'bold',paddingLeft:5,alignSelf:'center'},
    notification: { width: 24, height: 24, paddingRight: 10,alignSelf:'center' }, 
    mainText:{fontSize:25,fontWeight:'bold',paddingHorizontal:10,marginTop:10,marginBottom:10},
    square:{borderRadius:10, height:110,width:155,marginHorizontal:10,marginVertical:5 },
    mock:{fontSize:14,fontWeight:'bold',color:'white'},
    paper:{fontSize:12,color:'white'},
    testLine:{borderWidth:3,borderColor:'white',marginTop:10,width:'70%',borderRadius:2},
    imageshape:{height:30,width:30,alignSelf:'flex-end',marginTop:10},
    hw:{height:'100%',width:'100%'}
});

export default Paper