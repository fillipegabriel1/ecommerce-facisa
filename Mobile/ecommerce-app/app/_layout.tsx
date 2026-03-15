import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './loginStyle';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Text>Seja Bem-vindo</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
