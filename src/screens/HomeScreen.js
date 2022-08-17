import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPopulars} from '../services/tmdbApi';

export default function HomeScreen() {
  // state des films
  const [films, setFilms] = useState([]);
  // state pour affichage l'écran de chargement des données
  const [loading, setLoading] = useState(true);

  /**
   * Permet de récupèrer les données de la promèsse contenant le json sans utiliser de fonction callback
   */
  const bootstrapAsync = async () => {
    try {
      const {results} = await getPopulars();
      setFilms(results);
    } finally {
      setLoading(false);
    }
  };

  // Attention : il ne faut pas utiliser la function callback de useEffect en async/await
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemWrapper}>
      <Text>{item.title}</Text>
    </View>
  );
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      data={films}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}
const styles = StyleSheet.create({
  itemWrapper: {
    backgroundColor: 'darkblue',
  },
});
