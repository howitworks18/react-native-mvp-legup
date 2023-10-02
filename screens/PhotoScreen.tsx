import * as React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Text,
  Alert,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

const includeExtra = true;

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra,
    },
  },
];

export default function PhotoScreen() {
  const [selectedImages, setSelectedImages] = React.useState<any[]>([]);

  const onButtonPress = React.useCallback((type, options) => {
    const callback = (res: any) => {
      if (res?.assets) {
        setSelectedImages(prevImages => [...prevImages, ...res.assets]);
      }
    };

    if (type === 'capture') {
      ImagePicker.launchCamera(options, callback);
    } else {
      ImagePicker.launchImageLibrary(options, callback);
    }
  }, []);

  const handleImageClick = (uri: string) => {
    Alert.alert('Remove Photo', 'Do you want to remove this photo?', [
      {text: 'Cancel'},
      {
        text: 'Remove',
        onPress: () => {
          const newAssets = selectedImages.filter(
            (asset: {uri: string}) => asset.uri !== uri,
          );
          setSelectedImages(newAssets);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({title, type, options}) => {
            return (
              <Pressable
                style={styles.button}
                key={title}
                onPress={() => onButtonPress(type, options)}>
                <Text style={styles.buttonText}>{title}</Text>
              </Pressable>
            );
          })}
        </View>
        {selectedImages.map(({uri}: {uri: string}) => (
          <Pressable
            key={uri}
            onPress={() => handleImageClick(uri)}
            style={styles.imageContainer}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={styles.image}
              source={{uri: uri}}
            />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    minWidth: '45%',
    maxWidth: '100%',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: 'gray',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
