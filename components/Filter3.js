import react, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";

const Filter1 = ({
    face: {
        bounds: {
            size: { width: faceWidth, height: faceHeight },
        },
        LEFT_EYE,
        RIGHT_EYE,
        NOSE_BASE,
    }
}) => {
    const filterWidth = faceWidth * 2;
    const filterHeight = faceHeight * 0.6;

    const leftEyePosition = LEFT_EYE;
    const rightEyePosition = RIGHT_EYE;
    const noseBasePosition = NOSE_BASE;

    const transformAngle = (angleRad = Math.atan((rightEyePosition.y - leftEyePosition.y) / (rightEyePosition.x - leftEyePosition.x))) => (angleRad * 180) / Math.PI;

    return (
        <View style={{ position: "absolute", left: leftEyePosition.x - filterWidth * 0.36, right: rightEyePosition.x - filterWidth * 0.15, top: noseBasePosition.y - filterHeight * 1.5 }}>
            <Image
                source={require("../assets/crown-pic3.png")}
                style={{
                    width: filterWidth,
                    height: filterHeight,
                    resizeMode: "contain",
                    transform: [{ rotate: `${transformAngle()}deg` }]
                }}
            />
        </View>
    );
};

export default Filter1;