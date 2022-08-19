import {
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import {getImagePath} from '../services/tmdbApi';

const IMAGE_SIZE = Dimensions.get('screen').height / 3;

export default function FavoritesScreen() {
  // on récupère le props navigation via le hook fourni (on aurait pu le faire directement via le props du composant)
  const navigation = useNavigation();

  // On recupère le contenu du store
  const favorites = useSelector(state => state.favorites);

  const renderItem = ({item}) => {
    const isInFavorite = favorites.findIndex(
      favorite => favorite.id === item.id,
    );
    return (
      <View style={styles.itemWrapper}>
        {/* on navigue vers la page d'un film dt l'id est passé en paramètre de route */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {id: item.id, title: item.title})
          }>
          <Image
            style={styles.poster}
            source={{uri: getImagePath(item.poster_path)}}
            resizeMode="contain"
          />
          <Text style={styles.itemTitle}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Text style={styles.title}>Films populaires</Text>
      <FlatList
        data={favorites}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={() => (
          <Text>Vous n'avez pas de film en favoris</Text>
        )}
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
    height: IMAGE_SIZE,
  },
  itemTitle: {
    fontSize: 16,
    padding: 1,
  },
  loaderContainer: {
    marginVertical: 10,
  },
  likeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: -4,
    color: 'red',
  },
});
