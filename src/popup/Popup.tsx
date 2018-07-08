import * as React from 'react';
import './Popup.scss';

interface AppProps {
}

interface AppState { }

const OAUTH_ENDPOINT = 'https://login.salesforce.com/services/oauth2/authorize';
const CLIENT_ID = '3MVG9I1kFE5Iul2BYKzI252s0YFYfPhssmER1TlqMPEThx8Xu0I6lvvH1EI6LNlWRFDRVT9bbVQCIKUgP8bTI';

const REDIRECT_URI = chrome.identity.getRedirectURL('/provider_cb');


export default class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
  }

  componentDidMount() {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }

  onClickLogin() {
    console.log('clicked');
    console.log(chrome);
    chrome.identity.launchWebAuthFlow({
      url: `${OAUTH_ENDPOINT}?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`,
      interactive: true
    }, (authorizeResponse) => {
      console.log(authorizeResponse);

      const parseQueryString = (url) => {
        const res = {};
        const hash = new URL(decodeURIComponent(url)).hash;
        // Remove first character `#`
        const pairs = hash.slice(1).split('&');
        for (let i = 0; pairs[i]; i++) {
          var keyValue = pairs[i].split('=');
          res[keyValue[0]] = keyValue[1];
        }
        return res;
      }

      const params = parseQueryString(authorizeResponse);

      const token = params.access_token;
      console.log('token', params, token);
    });
  }

  render() {
    return (
      <div className="popupContainer">
        <button onClick={this.onClickLogin}>Login</button>
      </div>
    )
  }
}
