import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { getLatestGames } from './lib/metacritic';

export default function App() {
  const [games, set_games] = useState([])

  // useEffect carga todo cuando se refresca el componente
  useEffect(() => {
    getLatestGames().then((games) => {
      set_games(games);
    })
  }, 
  []);

  // <Text>Open up App.js to start working on your app</Text>
  // <Text>{JSON.stringify(games[0])}</Text>
  return (

    <View style={styles.container}>
      <ScrollView style={{padding: 20}} contentContainerStyle={{paddingVertical: 25,rowGap: 20}}>
        {games.map((game) => (
          <View key={game.slug} style={{padding: 20, width: 'auto', backgroundColor: '#f5f5f5', borderRadius: 20}}>
            <View flexDirection='col'>
              <Image style={styles.image} source={{uri: game.image}}></Image>
              <View style={{paddingTop: 10}}>
                <View flexDirection='row'>
                  <Text style={styles.score}>{game.score}</Text>
                  <Text style={styles.title}>{game.title}</Text>
                </View>
                <Text style={styles.description}>{game.description}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flex: 1,
  },
  score: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'green',
    paddingRight: 5,
  },
  description: {
    paddingTop: 10,
    fontSize: 14,
  }
});
