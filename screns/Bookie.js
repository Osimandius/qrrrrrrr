import React from 'react'
import {Text, View,TouchableOpacity,StyleSheet, Image, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Bookie1 extends React.Component{

    constructor(){
        super();
        this.state ={
            hasCameraPermissions : null,
            scanned : false,
            scannedBookId: " ",
            scannedStudentId:" ",
            buttonState : 'normal'
        }
    }

    getCameraPermissions=async(id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState ({
            hasCameraPermissions : status === "granted",
            buttonState : id
        })
    }

    handleBarCodeScanned =async ({type,data})=>{

        const {buttonState}  =this.state


        if(buttonState === "BookId"){
            this.setState({
                scanned :true,
                scannedBookId : data,
                buttonState :'normal'
            })
        }else if(buttonState === "StudentId"){
            this.setState({
                scanned :true,
                scannedStudentId : data,
                buttonState :'normal'
            })}

    }


    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === 'normal' && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                    style = {StyleSheet.absoluteFillObject}
                />
            )
        }

        else if(buttonState === 'normal'){
            return(
                <View style={styles.container}>

                    <View>
                        <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
                        <Text style = {{textAlign:"center" , fontSize: 30}}> Wily </Text>
                    </View>
                        
                    <View style = {styles.inputView}>
                        <TextInput 
                            style={styles.inputBox}
                            placeholder="Book ID"
                            value ={ this.state.scannedBookId} />
                            <TouchableOpacity style={styles.boop }
                                onPress ={()=>{
                                    this.getCameraPermissions('BookId')
                                }}
                            >
                                <Text>Ssscaaannnnn</Text>
                            </TouchableOpacity>
                    
                    </View>

                    <View style = {styles.inputView}>
                        <TextInput 
                            style={styles.inputBox}
                            placeholder="Student ID"
                            value={this.state.scannedStudentId}
                            />
                            <TouchableOpacity style={styles.boop }
                                onPress={()=>{
                                    this.getCameraPermissions('StudentId')
                                }}
                            >
                                <Text>Ssscaaannnnn</Text>
                            </TouchableOpacity>
                    
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    displayText:{
        fontSize: 15,
        textDecorationLine : 'underline'
    },
    scanButton:{
        backgroundColor:'#266564',
        padding :10,
        margin:10
    },
    inputView:{
        flexDirection:'row',
        margin:20
    },
    inputBox:{
        width:201,
        height:42,
        fontSize:20,
        borderWidth:1.5
    },
    boop:{
        backgroundColor:'darkGoldenrod',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    }
})