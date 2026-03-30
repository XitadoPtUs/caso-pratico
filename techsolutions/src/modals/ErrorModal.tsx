import {Component, ReactNode} from 'react';

export class ErrorModal extends Component<{ children?: ReactNode }> {
  render() {
    return (
        <h2>Error</h2>
    )
  }
}