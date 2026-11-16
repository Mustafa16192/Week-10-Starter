import { ScrollView } from "react-native";
import { Touch } from "../../components/ConcertUI";
import { useAppearance } from "../../state/Appearance";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text } from "../../theme";
import { useConcertTheme, useDaytime } from "../../useConcertTheme";
import { useSavedConcerts } from "../../state/SavedConcerts";
export default function ProfileScreen() {
  const theme = useConcertTheme();
  const day = useDaytime();
  const saved = useSavedConcerts();
  const appearance = useAppearance();
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <ScrollView>
          <Box
            padding="m"
            gap="l"
            maxWidth={680}
            width="100%"
            alignSelf="center"
          >
            <Text variant="hero">Profile</Text>
            <Box backgroundColor="surface" borderRadius="m" padding="m" gap="s">
              <Ionicons
                name="person-circle-outline"
                size={56}
                color={theme.colors.accent}
              />
              <Text variant="heading">Your space</Text>
              <Text color="muted">Explore as a guest. No account needed.</Text>
            </Box>
            <Box gap="xs">
              <Text variant="heading">{saved.ids.length} saved concerts</Text>
              <Text color="muted">Bookmarks stay on this device.</Text>
            </Box>
            <Box gap="s">
              <Text variant="heading">
                Appearance · {day ? "Light" : "Dark"}
              </Text>
              <Text color="muted">
                Choose a look. Automatic uses light from 7 AM to 7 PM and dark
                overnight.
              </Text>
              {(["light", "dark", "automatic"] as const).map((mode) => (
                <Touch
                  key={mode}
                  label={`${mode.charAt(0).toUpperCase() + mode.slice(1)} appearance`}
                  checked={appearance.mode === mode}
                  onPress={() => appearance.select(mode)}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor="surface"
                    borderRadius="m"
                    padding="m"
                  >
                    <Text fontWeight="600">
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Text>
                    <Ionicons
                      name={
                        appearance.mode === mode
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={24}
                      color={
                        appearance.mode === mode
                          ? theme.colors.accent
                          : theme.colors.muted
                      }
                    />
                  </Box>
                </Touch>
              ))}
              {appearance.error ? (
                <Text accessibilityRole="alert">{appearance.error}</Text>
              ) : null}
            </Box>
            <Text variant="caption">
              Afterglow · KMZ prototype. Fictional shows and song previews.
            </Text>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
}
