import React from "react"
import { View } from "react-native"

export const ShippedSuiteWidget = ({
    publicKey,
    mode = 'development',
    onChange
}: ShippedSuiteProps) => {
    console.log('Public key', publicKey)
    console.log('Mode', mode)
    console.log('onChange', onChange)

    return (
        <View>
            
        </View>
    )
}

interface ShippedSuiteProps {
    publicKey: string;
    mode: 'development' | 'production';
    onChange: () => void;
}