import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImagePath, getPopulars} from '../services/tmdbApi';

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
      <Image
        style={styles.poster}
        source={{uri: getImagePath(item.poster_path)}}
        resizeMode="contain"
      />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );

  return loading ? (
    <ActivityIndicator />
  ) : (
    <>
      <Text style={styles.title}>Films populaires</Text>
      <FlatList
        data={films}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 3,
    marginVertical: 5,
    textTransform: 'uppercase',
  },
  itemWrapper: {
    backgroundColor: '#1F1B24',
    flex: 1,
    margin: 2,
    elevation: 2,
  },
  poster: {
    height: Dimensions.get('screen').height / 3,
  },
  itemTitle: {
    fontSize: 16,
    padding: 1,
  },
});
