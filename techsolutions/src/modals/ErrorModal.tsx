import { Component } from 'react';

type ErrorModalProps = {
  message?: string;
};

export class ErrorModal extends Component<ErrorModalProps> {
  render() {
    const { message } = this.props;
    return (
      <div className="error-modal" role="alert" aria-live="assertive">
        <h2>Erro</h2>
        <p>{message ?? "Verifique os campos e tente novamente."}</p>
      </div>
    );
  }
}