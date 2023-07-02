import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, Image, ScrollView, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Filter1 from "../components/Filter1";
import Filter2 from "../components/Filter2";
import Filter3 from "../components/Filter3";
import Filter4 from "../components/Filter4";

const data = [
    { id: "crown-pic1", src: require("../assets/crown-pic1.png") },
    { id: "crown-pic2", src: require("../assets/crown-pic2.png") },
    { id: "crown-pic3", src: require("../assets/crown-pic3.png") },
    { id: "flower-pic1", src: require("../assets/flower-pic1.png") },
];

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            faces: [],
            current_filter: "crown-pic1"
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
                <View style={styles.upperContainer}>
                    <Image
                        source={require("../assets/appIcon.png")}
                        style={styles.appIcon}
                    />
                    <Text style={styles.appName}>LOOK ME....</Text>
                </View>
                <View style={styles.middleContainer}>
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
                    {this.state.faces.map(face => {
                        if (this.state.current_filter === "crown-pic1") {
                            return <Filter1 key={face.faceID} face={face} />
                        } else if (this.state.current_filter === "crown-pic2") {
                            return <Filter2 key={face.faceID} face={face} />
                        } else if (this.state.current_filter === "crown-pic3") {
                            return <Filter3 key={face.faceID} face={face} />
                        } else if (this.state.current_filter === "flower-pic1") {
                            return <Filter4 key={face.faceID} face={face} />
                        }
                    })}
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.lowerTopContainer}/>
                    <View style={styles.lowerBottomContainer}>
                        <ScrollView
                            contentContainerStyle={styles.filters}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {data.map(filter_data => {
                                return (
                                    <TouchableOpacity
                                        key={`filter-button-${filter_data.id}`}
                                        style={[
                                            styles.filterButton,
                                            {
                                                borderColor:
                                                    this.state.current_filter === filter_data.id
                                                        ? "#FFA384"
                                                        : "#FFFF"
                                            }
                                        ]}
                                        onPress={() => this.setState({ current_filter: `${filter_data.id}` })}
                                    >
                                        <Image
                                            source={filter_data.src}
                                            style={styles.filterImage}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E7F2F8"
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    upperContainer: {
      flex: 0.13,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E7F2F8",
      flexDirection: "row"
    },
    appIcon: {
      width: RFValue(50),
      height: RFValue(50),
      borderRadius: RFValue(25),
      borderWidth: 2,
      borderColor: "#FFA384",
      marginRight: RFValue(10)
    },
    appName: {
      color: "#FFA384",
      fontSize: RFValue(25),
      fontWeight: "800",
      fontStyle: "italic"
    },
    middleContainer: { flex: 0.67 },
    lowerContainer: {
      flex: 0.2,
      backgroundColor: "#E7F2F8"
    },
    lowerTopContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    lowerBottomContainer: {
      flex: 0.7,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#EFE7BC"
    },
    filters: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    filterButton: {
      height: RFValue(70),
      width: RFValue(70),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(35),
      backgroundColor: "#E7F2F8",
      borderWidth: 5,
      marginRight: RFValue(20),
      marginBottom: RFValue(10)
    },
    filterImage: {
      height: "60%",
      width: "60%",
      alignSelf: "center",
      resizeMode: "contain"
    }
  });