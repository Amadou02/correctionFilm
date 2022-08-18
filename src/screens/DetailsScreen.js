import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {getFilm} from '../services/tmdbApi';

export default function DetailsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {params} = useRoute();
  const {id} = params;

  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrapAsync = async () => {
    try {
      const filmObj = await getFilm(id);
      setFilm(filmObj);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTintColor: '#f1f1f1',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#000',
      },
    });
  }, [isFocused, navigation]);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>DetailsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
