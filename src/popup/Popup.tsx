import * as React from 'react';
import './Popup.scss';

interface AppProps {
    onClickLogin: () => void,
}

interface AppState {}

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
        console.log(chrome.identity);
  }

  render() {
    return (
        <div className="popupContainer">
            <button onClick={this.onClickLogin}>Login</button>
        </div>
        )
  }
}
