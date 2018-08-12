import * as React from 'react';
import Home from './Home';
import './Popup.scss';

interface AppProps {
}

interface AppState {
  connection: object,
}

const OAUTH_ENDPOINT = 'https://login.salesforce.com/services/oauth2/authorize';
const CLIENT_ID = '3MVG9I1kFE5Iul2BYKzI252s0YFYfPhssmER1TlqMPEThx8Xu0I6lvvH1EI6LNlWRFDRVT9bbVQCIKUgP8bTI';

const REDIRECT_URI = chrome.identity.getRedirectURL('/provider_cb');


export default class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
    this.state = {
      connection: null,
    };

    this.onClickLogin = this.onClickLogin.bind(this);
  }

  componentDidMount() {
    console.log('mount');
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });

    chrome.storage.local.get(['connection'], (result) => {
      this.setState({ connection: result.connection });
    });
  }

  onClickLogin() {
    console.log('clicked');
    chrome.identity.launchWebAuthFlow({
      url: `${OAUTH_ENDPOINT}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
      interactive: false
    }, (authorizeResponse) => {
      console.log(authorizeResponse);

      const parseQueryString = (url) => {
        const res = {};
        const hash = new URL(decodeURIComponent(url)).hash;
        // Remove first character `#`
        const pairs = hash.slice(1).split('&');
        for (let i = 0; pairs[i]; i++) {
          const [key, value] = pairs[i].split('=');
          res[key] = value;
        }
        return res;
      }

      const connection = parseQueryString(authorizeResponse);
      console.log(connection);

      chrome.storage.local.set({ connection }, () => {
      })
    });
  }

  render() {
    console.log('this.state.connection', this.state.connection);
    return (
      <div className="popupContainer">
        <button onClick={this.onClickLogin}>Login</button>
      </div>
    )
  }
}
