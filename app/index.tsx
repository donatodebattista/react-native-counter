import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Paletas de Colores
export const lightTheme = {
  background: "#FAFAFA",
  card: "#FFFFFF",
  textPrimary: "#0A0A0A",
  textSecondary: "#71717A",
  border: "#E4E4E7",
  accentBg: "#0A0A0A",
  accentText: "#FFFFFF",
  accentSignal: "#22C55E",
};

export const darkTheme = {
  background: "#0A0A0A",
  card: "#111111",
  textPrimary: "#FFFFFF",
  textSecondary: "#71717A",
  border: "#262626",
  accentBg: "#FFFFFF",
  accentText: "#0A0A0A",
  accentSignal: "#4ADE80",
};

type ThemeMode = "light" | "dark";

const MONO_FONT = Platform.select<string>({
  ios: "Courier New",
  android: "monospace",
  default: "monospace",
});

// Constantes del switch
const TRACK_W = 56;
const TRACK_H = 28;
const THUMB_SIZE = 20;
const THUMB_MARGIN = (TRACK_H - THUMB_SIZE) / 2; // 4px
const THUMB_LEFT = THUMB_MARGIN;                  // posición light
const THUMB_RIGHT = TRACK_W - THUMB_SIZE - THUMB_MARGIN; // posición dark

const useThemeStyles = (mode: ThemeMode) => {
  const theme = mode === "light" ? lightTheme : darkTheme;

  return StyleSheet.create({
    // Contenedor raíz
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    // Área centrada principal
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 40,
      justifyContent: "center",
      alignItems: "center",
    },

    // Tarjeta
    card: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.card,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      paddingVertical: 40,
      paddingHorizontal: 32,
      alignItems: "center",
    },

    // Número del contador 
    counterNumber: {
      fontFamily: MONO_FONT,
      fontSize: 64,
      fontWeight: "700",
      color: theme.textPrimary,
      letterSpacing: 2,
      marginBottom: 28,
    },


    // Línea de status estilo terminal
    statusLine: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      marginBottom: 20,
    },
    statusText: {
      fontFamily: MONO_FONT,
      fontSize: 13,
      fontWeight: "400",
      color: theme.textSecondary,
      letterSpacing: 0.5,
    },
    statusCursor: {
      fontFamily: MONO_FONT,
      fontSize: 13,
      fontWeight: "400",
      color: theme.accentSignal,
    },

    // Botón +1
    plusButton: {
      width: 64,
      height: 48,
      borderRadius: 5,
      backgroundColor: theme.accentBg,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      // Sin elevation/shadow
    },

    // Botón +1 (locked)
    plusButtonLocked: {
      width: 64,
      height: 48,
      borderRadius: 5,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: theme.border,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
    },

    plusButtonText: {
      fontFamily: MONO_FONT,
      color: theme.accentText,
      fontSize: 18,
      fontWeight: "700",
      letterSpacing: 1,
    },

    plusButtonTextLocked: {
      fontFamily: MONO_FONT,
      color: theme.textSecondary,
      fontSize: 10,
      fontWeight: "400",
      letterSpacing: 2,
      textTransform: "uppercase",
    },

    // Botón Reset
    resetButton: {
      width: "100%",
      height: 44,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 4,
    },

    resetButtonText: {
      fontFamily: MONO_FONT,
      color: theme.textPrimary,
      fontSize: 13,
      fontWeight: "400",
      letterSpacing: 2,
      textTransform: "uppercase",
    },

    // Switch de tema
    switchWrapper: {
      position: "absolute",
      top: 24,
      right: 24,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    switchLabel: {
      fontFamily: MONO_FONT,
      fontSize: 10,
      fontWeight: "400",
      letterSpacing: 1,
    },
    switchTrack: {
      width: TRACK_W,
      height: TRACK_H,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      justifyContent: "center",
    },
    switchThumb: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: 3,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    switchThumbDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.accentSignal,
    },
  });
};

// Cursor parpadeante 
function BlinkingCursor({ style }: { style: object }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.Text style={[style, { opacity }]}>{"_"}</Animated.Text>
  );
}

// Switch animado tipo terminal 
function ThemeSwitch({
  mode,
  theme,
  styles,
  onToggle,
}: {
  mode: ThemeMode;
  theme: typeof lightTheme;
  styles: ReturnType<typeof useThemeStyles>;
  onToggle: () => void;
}) {
  const translateX = useRef(
    new Animated.Value(mode === "light" ? THUMB_LEFT : THUMB_RIGHT)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: mode === "light" ? THUMB_LEFT : THUMB_RIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [mode, translateX]);

  const isDark = mode === "dark";

  return (
    <Pressable
      style={styles.switchWrapper}
      onPress={onToggle}
    >
      {/* Label izquierdo: "light" */}
      <Text
        style={[
          styles.switchLabel,
          {
            color: isDark
              ? theme.textSecondary
              : theme.textPrimary,
            opacity: isDark ? 0.5 : 1,
          },
        ]}
      >
        light
      </Text>

      {/* Track */}
      <View style={styles.switchTrack}>
        <Animated.View
          style={[
            styles.switchThumb,
            { transform: [{ translateX }] },
          ]}
        >
          {/* Dot verde dentro del thumb */}
          <View style={styles.switchThumbDot} />
        </Animated.View>
      </View>

      {/* Label derecho: "dark" */}
      <Text
        style={[
          styles.switchLabel,
          {
            color: isDark
              ? theme.textPrimary
              : theme.textSecondary,
            opacity: isDark ? 1 : 0.5,
          },
        ]}
      >
        dark
      </Text>
    </Pressable>
  );
}

export default function Index() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<ThemeMode>("light");
  const styles = useThemeStyles(mode);
  const theme = mode === "light" ? lightTheme : darkTheme;

  const handleIncrement = () => {
    if (count >= 10) return;
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const isLocked = count >= 10;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* ── Switch de tema ── */}
        <ThemeSwitch
          mode={mode}
          theme={theme}
          styles={styles}
          onToggle={handleToggle}
        />

        <View style={styles.card}>
          {/* ── Número del contador ── */}
          <Text style={styles.counterNumber}>{count}</Text>

          {/* ── Botón +1 / LOCKED ── */}
          <Pressable
            style={({ pressed }) => [
              isLocked ? styles.plusButtonLocked : styles.plusButton,
              Platform.OS === "ios" && pressed && !isLocked
                ? { transform: [{ scale: 0.95 }] }
                : undefined,
            ]}
            onPress={handleIncrement}
            disabled={isLocked}
            android_ripple={
              isLocked
                ? null
                : { color: "rgba(128,128,128,0.2)", borderless: false }
            }
          >
            <Text
              style={
                isLocked ? styles.plusButtonTextLocked : styles.plusButtonText
              }
            >
              {isLocked ? "LOCKED" : "+1"}
            </Text>
          </Pressable>

          {/* ── Línea de status terminal (solo cuando está locked) ── */}
          {isLocked && (
            <View style={styles.statusLine}>
              <Text style={styles.statusText}>
                {">"} max count reached (10/10){" "}
              </Text>
              <BlinkingCursor style={styles.statusCursor} />
            </View>
          )}

          {/* ── Botón Reset ── */}
          <Pressable
            style={({ pressed }) => [
              styles.resetButton,
              Platform.OS === "ios" && pressed
                ? { transform: [{ scale: 0.97 }] }
                : undefined,
            ]}
            onPress={handleReset}
            android_ripple={{ color: "rgba(128,128,128,0.15)", borderless: false }}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}