import {API_BASE_URL, IMAGE_BASE_URL} from './../constants';
import {API_KEY} from './../constants/secrets';
/**
 * configuration des options de la requête.
 * Elle est facultative pour les siimples appels GET, mais permet de mieux contrôler l'échange en l'api et votre application
 *
 * @var config
 */
const config = {
  method: 'GET',
  headers: {
    'content-Type': 'application/json', // permet de définir le type mine du contenu de la requête pour le serveur.
  },
};
/**
 * Appel api pour récupérer la liste des films les plus populaires.
 * @returns Promise | la promesse qui peut se resoudre (then) ou échouer (catch)
 */
// async / await permet d'utiliser les promèsse JS sans récourir à des fonction callback
export const getPopulars = async currentPage => {
  // Gestion des exceptions dans un try/catch
  try {
    // On démarre la requête
    const request = await fetch(
      `${API_BASE_URL}/popular?api_key=${API_KEY}&page=${currentPage}`,
      config,
    );
    // On traite la reponse réçu pour en extraire le corps sous la forme d'un objet json
    return await request.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const getFilm = async id => {
  // Gestion des exceptions dans un try/catch
  try {
    // On démarre la requête
    const request = await fetch(
      `${API_BASE_URL}/${id}?api_key=${API_KEY}&append_to_response=similar`,
      config,
    );
    // On traite la reponse réçu pour en extraire le corps sous la forme d'un objet json
    return await request.json();
  } catch (error) {
    console.log(error.message);
  }
};

export const getImagePath = path => `${IMAGE_BASE_URL}${path}`;
