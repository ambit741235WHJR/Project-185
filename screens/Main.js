import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            faces: [],
        };

        this.onFacesDetected = this.onFacesDetected.bind(this);
    }

    async componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermissions);
    }

    onCameraPermissions = (status) => {
        this.setState({ hasPermission: status.status === "granted" });
    }

    onFacesDetected({ faces }) {
        this.setState({ faces });
    }

    onFaceDetectionError = (error) => { console.log(error) }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }

        if (hasCameraPermission === false) {
            return <View style={styles.container}><Text>No access to camera</Text></View>;
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>LOOK ME....</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode["1"],
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFaceDetectionError}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({ 
    container: { 
        flex: 1 
    },

    droidSafeArea: { 
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
    },

    headingContainer: { 
        flex: 0.1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    titleText: { 
        fontSize: 30
    },

    cameraStyle: { 
        flex: 0.65 
    }
});