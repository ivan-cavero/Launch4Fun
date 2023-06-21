import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

const CustomTooltip = ({
  children,
  backgroundColor = 'rgb(61, 61, 61)',
  textColor = '#fff',
  tooltipText,
  tooltipWidth = 150,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: -1000, y: -1000 });
  const targetRef = useRef(null);

  const handlePress = async () => {
    if (!isVisible) {
      targetRef.current.measure((fx, fy, targetWidth, height, px, py) => {
        const screenWidth = Dimensions.get('window').width;
        const tooltipX = Math.max(0, Math.min(px + (targetWidth / 2.5) - (tooltipWidth / 2.5), screenWidth - tooltipWidth));
        const tooltipY = py + height + 10;
        setTooltipPosition({ x: tooltipX, y: tooltipY });
      });
    }
    setIsVisible(!isVisible);
  };   

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <View
            style={[
              styles.tooltipContainer,
              { backgroundColor, top: tooltipPosition.y, left: tooltipPosition.x, width: tooltipWidth },
            ]}
          >
            <Svg height="10" width="20" style={styles.triangle}>
              <Polygon points="0,10 10,0 20,10" fill={backgroundColor} />
            </Svg>
            <Text
              style={[
                styles.tooltipText,
                { color: textColor, maxWidth: tooltipWidth - 30 },
              ]}
            >
              {tooltipText}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity ref={targetRef} onPress={handlePress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  tooltipContainer: {
    position: 'absolute',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  triangle: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -10,
  },
  tooltipText: {
    fontSize: 12,
  },
});

export default CustomTooltip;
