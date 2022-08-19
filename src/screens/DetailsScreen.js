import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {getFilm, getImagePath} from '../services/tmdbApi';

import IonIcons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../redux/favoritesSlice';

export default function DetailsScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {params} = useRoute();

  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  // le dispatcher d'action
  const dispatch = useDispatch();
  // Permet d'accéder au contenu du store
  const favorites = useSelector(state => state.favorites);
  // permet de mémoïser la fonction à fin que qu'elle ne soit pas rédéclarer à chaque nouveau rendu
  // permet d'optimiser les rendu et d'éviter des boucles infinis
  const bootstrapAsync = useCallback(async () => {
    try {
      const filmObj = await getFilm(params.id);
      setFilm(filmObj);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Définit la couleur rouge pour les fav et pas de couleur pour les autres
  const isInFavorites = favorites.findIndex(fav => fav.id == params.id) !== -1;
  useEffect(() => {
    // modifit le header de la navigation à la volée.
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      title: '',
    });
    bootstrapAsync();
  }, [bootstrapAsync, isFocused, navigation, params]);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.filmWrapper}>
        <Image
          style={styles.poster}
          source={{uri: getImagePath(film.poster_path)}}
          resizeMode="cover"
        />
        <View style={styles.filmMainContainer}>
          <Text style={styles.title}>
            {film.title} ({film.release_date})
          </Text>
          <Text style={styles.rateText}>
            Note : {Math.round(film.vote_average)}
          </Text>
          <Text numberOfLines={8} style={styles.bodyText}>
            {film.overview}
          </Text>
          {/* Bouton like et dislike */}
          <TouchableOpacity onPress={() => dispatch(toggleFavorite(film))}>
            {isInFavorites ? (
              <IonIcons name="heart-circle" size={30} color="red" />
            ) : (
              <IonIcons name="heart-circle" size={30} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.similarWrapper}>
        <Text style={[styles.title, styles.heading]}>Films Similaires</Text>
        <FlatList
          data={film.similar.results}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          horizontal
          renderItem={({item: {poster_path, id}}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {id: id});
              }}>
              <Image
                style={styles.carouselItem}
                source={{uri: getImagePath(poster_path)}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    flex: 1,
  },
  filmMainContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  filmWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  rateText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  bodyText: {
    lineHeight: 18,
    textAlign: 'justify',
    marginBottom: 5,
  },
  similarWrapper: {
    flex: 1,
    alignContent: 'flex-start',
  },
  heading: {
    textTransform: 'uppercase',
    marginTop: 10,
    letterSpacing: 5,
  },
  carouselItem: {
    width: Dimensions.get('screen').width / 2,
    height: 350,
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  separator: {
    width: 10,
  },
});
