import React, { FormEvent } from 'react';

interface Props {
  onLogin: (username: string, password: string) => void;
}

export default class Login extends React.Component<Props> {
  username = React.createRef<HTMLInputElement>();
  password = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this.username.current!.focus();
  }

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onLogin(this.username.current!.value, this.password.current!.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="">Benuzername:</label>
          <input type="text" id="username" ref={this.username} />
        </div>
        <div>
          <label>Passwort:</label>
          <input type="password" id="password" ref={this.password} />
        </div>
        <button type="submit">anmelden</button>
      </form>
    );
  }
}
