import React, { useMemo } from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ReusableModal = ({ visible, onClose, title, children }) => {
    // Get the current theme from the state
    const themeFromStore = useSelector((state) => state.configuration.theme);

    const initialTheme = themeFromStore === 'light' ? 'light' : 'dark';

    // Define style properties for themes
    const themeStyles = useMemo(() => ({
        light: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
            modalBackground: 'rgba(0, 0, 0, 0.5)'
        },
        dark: {
            backgroundColor: '#202020',
            textColor: '#ffffff',
            modalBackground: 'rgba(0, 0, 0, 0.5)'
        }
    }), []);

    // Select the style for the current theme
    const selectedTheme = themeStyles[initialTheme];

    return (
        <Modal transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableOpacity style={[styles.modalContainer, { backgroundColor: selectedTheme.modalBackground }]} onPress={onClose}>
                <View style={[styles.modalContent, { backgroundColor: selectedTheme.backgroundColor }]}>
                    <Text style={[styles.sectionTitle, { color: selectedTheme.textColor }]}>{title}</Text>
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '80%',
        borderRadius: 20,
        padding: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    }
});

export default ReusableModal;
