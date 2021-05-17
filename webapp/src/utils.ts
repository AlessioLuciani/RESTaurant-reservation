import { Options, Vue } from 'vue-class-component';
import router from './router';

@Options({
  components: {},
})
export default class Utils extends Vue {
  static signInSilently() {
    if (localStorage.authToken === undefined) {
      console.log('Silent sign in failed');
      return;
    }
    const user = {
      email: localStorage.authEmail,
      token: localStorage.authToken,
    };
    console.log(user);
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'http://localhost:12001/login', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        const response = JSON.parse(xmlHttp.responseText);
        if (response.error !== undefined) {
          console.log('Removing invalid credentials from local storage');
          localStorage.removeItem('authToken');
          localStorage.removeItem('authEmail');
        } else {
          console.log(response);
          router.replace('/explore');
        }
      }
    };
    xmlHttp.send(JSON.stringify(user));
  }
}
