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
import React, {useEffect, useState} from 'react';
import {getImagePath, getPopulars} from '../services/tmdbApi';
import {useNavigation} from '@react-navigation/native';

const IMAGE_SIZE = Dimensions.get('screen').height / 3;

export default function HomeScreen() {
  // state des films
  const [films, setFilms] = useState([]);
  // state pour affichage l'écran de chargement des données
  const [loading, setLoading] = useState(true);

  // on récupère le props navigation via le hook fourni (on aurait pu le faire directement via le props du composant)
  const navigation = useNavigation();

  // state pour la pagination, initialisé pour demarrer à page 1
  const [currentPage, setCurrentPage] = useState(1);
  // ref pour la valeur à animer

  // Attention : il ne faut pas utiliser la function callback de useEffect en async/await
  useEffect(() => {
    /**
     * Permet de récupèrer les données de la promèsse contenant le json sans utiliser de fonction callback
     */
    const bootstrapAsync = async () => {
      try {
        const {results} = await getPopulars(currentPage);
        setFilms([...films, ...results]);
      } finally {
        setLoading(false);
      }
    };
    // on appel la fonction bootstrappé.
    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemWrapper}>
        {/* on navigue vers la page d'un film dt l'id est passé en paramètre de route */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {id: item.id})}>
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

  const renderFooter = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" />
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
        keyExtractor={(item, index) => index}
        extraData={currentPage}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setCurrentPage(p => p + 1);
        }}
        ListFooterComponent={renderFooter}
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
});
