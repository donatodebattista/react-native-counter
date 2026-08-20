# Contador con toggle de tema 🌓

App móvil desarrollada con [Expo](https://expo.dev) que implementa un contador interactivo con tema claro/oscuro.

## Funcionalidades

- **Contador**: incrementa de a uno con el botón `+1`.
- **Reset**: vuelve el contador a 0.
- **Toggle de tema**: alterna entre modo claro y oscuro con un switch animado.
- **Límite máximo**: el botón `+1` se bloquea al llegar a 10, con un indicador de estado tipo terminal.
- **Estilo visual**: estética minimalista inspirada en herramientas de desarrollador (tipografía monoespaciada, bordes finos, sin sombras), con un acento de color mínimo para indicar estado activo.

## Stack técnico

- [Expo](https://expo.dev) (SDK 54)
- React Native
- TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction) (file-based routing)

## Cómo correrlo

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar la app

   ```bash
   npx expo start
   ```

3. Elegí cómo abrirla desde la salida de la consola:

   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [Simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go), sandbox liviano para probar sin generar un build

## Estructura del proyecto

El desarrollo principal está en `app/index.tsx`, usando [file-based routing](https://docs.expo.dev/router/introduction) de Expo Router. Los tokens de tema (`lightTheme`, `darkTheme`) y el hook `useThemeStyles` están separados de la lógica del componente para mantener la UI desacoplada del estado.