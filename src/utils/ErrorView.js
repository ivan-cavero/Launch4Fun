import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const errorMessages = {
  400: 'Bad Request: The request is incorrect or invalid',
  401: 'Unauthorized: You do not have permission to access this resource',
  403: 'Forbidden: You do not have sufficient permissions to access this resource',
  404: 'Not Found: The requested resource was not found',
  406: 'Not Acceptable: The request can only generate a response with content different from what was specified as acceptable',
  407: 'Proxy Authentication Required: Authentication is required through a proxy',
  408: 'Request Timeout: The server has spent too much time waiting for a response from the client',
  409: 'Conflict: The request could not be completed due to a conflict',
  410: 'Gone: The resource no longer exists',
  411: 'Length Required: The content length must be specified',
  412: 'Precondition Failed: The server does not meet the preconditions indicated in the request',
  413: 'Payload Too Large: The request is too long and the server refuses to process it',
  414: 'URI Too Long: The web address is too long',
  429: 'The user has sent too many requests in a given amount of time',
  500: 'Internal Server Error: Internal server error',
  501: 'Not Implemented: The server has not yet implemented the requested method',
  502: 'Bad Gateway: The server is acting as a proxy or gateway and has received an invalid response from the other server',
  504: 'Gateway Timeout: The proxy server did not receive a response in time from the origin server'
}

const ErrorView = ({ errorMessage }) => {
  const errorCode = errorMessage.match(/\d+/)[0];

  const displayMessage = errorMessages[errorCode] || errorMessage;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#60A3D9', '#0074B7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.errorCodeContainer}
      >
        <Text style={styles.errorCode}>{errorCode}</Text>
      </LinearGradient>
      <Text style={styles.errorMessage}>{displayMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCodeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  errorCode: {
    fontFamily: 'Roboto-Regular',
    fontSize: 40,
    color: 'white',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: 'rgb(119, 119, 119)',
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20
  },
});

export default ErrorView;
