import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../store/configuration';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReusableModal from '../Reusable/ReusableModal';

const ConfigurationPage = () => {
	const dispatch = useDispatch();

	const themeFromStore = useSelector((state) => state.configuration.theme);
	const isDarkModeInitial = themeFromStore === 'dark';
	const [isDarkMode, setIsDarkMode] = useState(isDarkModeInitial);
	const [selectedLanguage, setSelectedLanguage] = useState('en');
	const languages = ['en'];
	const [cacheSize, setCacheSize] = useState(0);
	const [isColorModalVisible, setIsColorModalVisible] = useState(false);
	const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

	useEffect(() => {
		calculateCacheSize();

		const newMode = themeFromStore === 'dark';
		setIsDarkMode(newMode);
		dispatch(setTheme(newMode ? 'dark' : 'light'));
	}, []);

	const calculateCacheSize = async () => {
		try {
			const keys = await AsyncStorage.getAllKeys();
			let size = 0;

			for (const key of keys) {
				const value = await AsyncStorage.getItem(key);
				size += value.length;
			}

			const formattedSize = size > 1000 ? `${(size / 1000).toFixed(2)} MB` : `${size} KB`;
			setCacheSize(formattedSize);
		} catch (error) {
			console.error('Error calculating cache size:', error);
		}
	};

	const openColorModal = () => {
		setIsColorModalVisible(true);
	};

	const closeColorModal = () => {
		setIsColorModalVisible(false);
	};

	const openLanguageModal = () => {
		setIsLanguageModalVisible(true);
	};

	const closeLanguageModal = () => {
		setIsLanguageModalVisible(false);
	};

	const selectColorScheme = (scheme) => {
		if (scheme === 'Light') {
			dispatch(setTheme('light'));
			showMessage({
				message: 'Light Mode',
				type: 'success'
			});
		} else {
			dispatch(setTheme('dark'));
			showMessage({
				message: 'Dark Mode',
				type: 'success'
			});
		}
	};

	const selectLanguage = (language) => {
		setSelectedLanguage(language);
	};

	const getStyles = (mode) =>
		StyleSheet.create({
			container: {
				flex: 1,
				padding: 20,
				backgroundColor: mode.backgroundColor
			},
			section: {
				marginBottom: 30
			},
			sectionTitle: {
				fontSize: 16,
				fontWeight: 'bold',
				color: '#3498db',
				marginBottom: 10
			},
			row: {
				flexDirection: 'row',
				alignItems: 'center',
				marginBottom: 15
			},
			column: {
				flexDirection: 'column',
				alignItems: 'flex-start'
			},
			description: {
				fontSize: 14,
				color: mode.textColor
			},
			label: {
				flex: 1,
				fontSize: 18,
				color: mode.textColor
			},
			value: {
				fontSize: 18,
				color: mode.textColor
			},
			icon: {
				width: 24,
				marginRight: 10
			},
			switch: {
				transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
				flex: 2
			},
			buttonContainer: {
				borderRadius: 20,
				overflow: 'hidden'
			},
			colorOptionText: {
				fontSize: 18,
				color: mode.textColor,
				marginLeft: 10
			}
		});

	const themes = {
		light: {
			backgroundColor: '#ffffff',
			textColor: '#000000'
		},
		dark: {
			backgroundColor: '#202020',
			textColor: '#ffffff'
		}
	};

	const styles = useMemo(() => getStyles(themes[isDarkMode ? 'dark' : 'light']), [isDarkMode]);

	return (
		<View style={styles.container}>
			{/* Account Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Account</Text>
				<View style={styles.row}>
					<MaterialCommunityIcons name="email-outline" size={24} color={styles.value.color} style={styles.icon} />
					<View style={styles.column}>
						<Text style={styles.value}>Email</Text>
						<Text style={styles.description}>example@example.com</Text>
					</View>
				</View>
				<View style={styles.row}>
					<MaterialCommunityIcons name="wallet-outline" size={24} color={styles.value.color} style={styles.icon} />
					<View style={styles.column}>
						<Text style={styles.value}>Subscription</Text>
						<Text style={styles.description}>Free Plan</Text>
					</View>
				</View>
				<View style={styles.row}>
					<MaterialCommunityIcons name="shield-check-outline" size={24} color={styles.value.color} style={styles.icon} />
					<Text style={styles.value}>Data Controls</Text>
				</View>
			</View>

			{/* App Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>App</Text>
				{/* Color Scheme Option */}
				<TouchableOpacity style={styles.row} onPress={openColorModal}>
					<MaterialCommunityIcons name="palette-outline" size={24} color={styles.value.color} style={styles.icon} />
					<View style={styles.column}>
						<Text style={styles.value}>Color Scheme</Text>
						<Text style={styles.description}>{themeFromStore}</Text>
					</View>
				</TouchableOpacity>
				{/* Language Option */}
				<TouchableOpacity style={styles.row} onPress={openLanguageModal}>
					<MaterialCommunityIcons name="earth" size={24} color={styles.value.color} style={styles.icon} />
					<Text style={styles.value}>Language</Text>
				</TouchableOpacity>
			</View>

			{/* About Section */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>About</Text>
				<View style={styles.row}>
					<MaterialCommunityIcons name="help-circle-outline" size={24} color={styles.value.color} style={styles.icon} />
					<View style={styles.column}>
						<Text style={styles.value}>Launch4Fun</Text>
						<Text style={styles.description}>Android: 0.1.0</Text>
					</View>
				</View>
				<View style={styles.row}>
					<MaterialCommunityIcons name="file-document-outline" size={24} color={styles.value.color} style={styles.icon} />
					<Text style={styles.value}>Terms of Use</Text>
				</View>
				<View style={styles.row}>
					<MaterialCommunityIcons name="file-certificate-outline" size={24} color={styles.value.color} style={styles.icon} />
					<Text style={styles.value}>Licenses</Text>
				</View>
				<TouchableOpacity onPress={() => {}} style={[styles.row, styles.colorOption]}>
					<MaterialCommunityIcons name="logout" size={24} color="#FF5733" style={styles.icon} />
					<Text style={[styles.value, { color: '#FF5733' }]}>Sign Out</Text>
				</TouchableOpacity>
			</View>

			{/* Color Scheme Modal */}
			<ReusableModal
				visible={isColorModalVisible}
				onClose={closeColorModal}
				title="Select Color Scheme"
			>
				{['Light', 'Dark'].map((scheme) => (
					<TouchableOpacity key={scheme} style={[styles.colorOption, { marginBottom: 10 }]} onPress={() => selectColorScheme(scheme)}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<MaterialCommunityIcons
								name={scheme === 'Light' ? 'brightness-5' : 'brightness-3'}
								size={24}
								color={themes[isDarkMode ? 'dark' : 'light'].textColor}
							/>
							<Text style={styles.colorOptionText}>{scheme}</Text>
						</View>
					</TouchableOpacity>
				))}
			</ReusableModal>

			{/* Language Modal */}
			<ReusableModal
				visible={isLanguageModalVisible}
				onClose={closeLanguageModal}
				title="Select Language"
			>
				{languages.map((language) => (
					<TouchableOpacity key={language} style={styles.colorOption} onPress={() => selectLanguage(language)}>
						<MaterialCommunityIcons name="earth" size={24} color={themes.light.textColor} />
						<Text style={styles.colorOptionText}>{language}</Text>
					</TouchableOpacity>
				))}
			</ReusableModal>
		</View>
	);
};

export default ConfigurationPage;
