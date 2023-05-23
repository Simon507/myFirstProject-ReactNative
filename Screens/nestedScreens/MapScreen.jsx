import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const location = route.params.location;

  return (
    <View style={styles.container}>
      {location.coords ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Фото сделано здесь"
          />
        </MapView>
      ) : (
        <>
          <Text style={styles.noLocationTxt}>Извините,</Text>
          <Text style={styles.noLocationTxt}>отсутствуют данные</Text>
          <Text style={styles.noLocationTxt}>о месте создания фото</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: { width: '100%', height: '100%' },
  noLocationTxt: { fontSize: 30 },
});

export default MapScreen;
