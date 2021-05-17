import { Options, Vue } from 'vue-class-component';
import router from './router';

@Options({
  components: {},
})
export default class Utils extends Vue {
  static isLogged = false;

  static signInSilently() {
    if (localStorage.authToken === undefined) {
      console.log('Silent sign in failed');
      return;
    }

    Utils.loginUser(localStorage.authEmail, localStorage.authToken, (response) => {
      if (response.error !== undefined) {
        console.log('Removing invalid credentials from local storage');
        Utils.resetUserCredentials();
      } else {
        router.replace('/explore');
      }
    });
  }

  static capitalizeFirst(str: string) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }

  static resetUserCredentials() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');
    localStorage.removeItem('authType');
  }

  static loginUser(userEmail: string, userPassword: string, callback: (o: any) => any) {
    if (userEmail === undefined || userPassword === undefined) {
      return;
    }
    const user = { email: userEmail, token: userPassword };
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'http://localhost:12001/login', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        const response = JSON.parse(xmlHttp.responseText);
        callback(response);
      }
    };
    xmlHttp.send(JSON.stringify(user));
  }
}
