import {makeAutoObservable, runInAction} from 'mobx';
import {hydrateStore, makePersistable} from 'mobx-persist-store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {isEqual} from 'lodash';

export interface User {
  username: string;
}

export class UserStore implements IStore {
  User: User | null = null;
  isLoggedIn = false;
  username = '';
  uid = '';

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: UserStore.name,
      properties: ['isLoggedIn', 'username', 'uid'],
    });

    auth().onAuthStateChanged(async user => {
      if (user) {
        runInAction(() => {
          this.isLoggedIn = true;
          this.uid = user.uid;
        });

        // Check if user exists in Firebase
        const userRef = firestore().collection('users').doc(user.uid);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          // Populate user store with data from Firebase
          const userData = userDoc.data() as User;
          this.setUser(userData);

          // Watch for changes to the user document
          userRef.onSnapshot(this.onUserSnapshot);
        } else {
          // Add new user to Firebase with data from user store
          await userRef.set({
            username: this.username,
            uid: this.uid,
          });

          // Watch for changes to the user document
          userRef.onSnapshot(this.onUserSnapshot);
        }
      } else {
        runInAction(() => {
          this.isLoggedIn = false;
          this.uid = '';
          // Add code to reset other user properties here
          this.setUser({} as User);
        });
      }
    });
  }

  onUserSnapshot = (doc: {data: () => User}) => {
    const newData = doc.data() as User;
    const oldData = this as User;
    if (!isEqual(newData, oldData)) {
      const updatedData = Object.assign({}, this, newData);
      this.setUser(updatedData);
    }
  };

  setUser = (userData: User) => {
    this.username = userData?.username ?? '';
  };

  logout = async () => {
    this.setUser({} as User);
  };

  // Unified set methods
  set<T extends StoreKeysOf<UserStore>>(what: T, value: UserStore[T]) {
    (this as UserStore)[what] = value;
    if (this.uid) {
      firestore()
        .collection('users')
        .doc(this.uid)
        .update({
          [what]: value,
        });
    }
  }
  setMany<T extends StoreKeysOf<UserStore>>(obj: Record<T, UserStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as UserStore[T]);
    }
    if (this.uid) {
      firestore().collection('users').doc(this.uid).update(obj);
    }
  }

  clear = async () => {
    this.User = {} as User;
    this.User = {...this.User};
  };

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
