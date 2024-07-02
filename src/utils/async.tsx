import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  loginDetails: 'LOGIN_DETAILS',
  userSettings: 'USER_SETTINGS',
};

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  } catch (e) { }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) { }
  console.log('Done.');
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) { }
};
