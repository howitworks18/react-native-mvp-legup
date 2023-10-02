const fs = require('fs');
const path = require('path');

const type = process.argv[2]; // screen or component
const name = process.argv[3]; // ScreenName or ComponentName

if (!type || !name) {
  console.log('Please specify the type (screen or component) and the name.');
  process.exit(1);
}

const template = `import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ${name} = ({route}) => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ${name};
`;

const directory = type === 'screen' ? 'screens' : 'components';

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

fs.writeFile(path.join(directory, `${name}.tsx`), template, (err) => {
  if (err) {
    console.error('Error creating the file:', err);
    return;
  }

  console.log(`${name}.tsx has been generated in the ${directory} folder.`);
});
