import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  padding: 24px 40px;
  & h1 {
    margin: 0;
  }
`;
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorMessage>
          <h3>
            [사이트 블록 파일 오류]: 방금 선택하신 블록의 SiteBlock 파일에
            문제가 없는지 확인해주세요
          </h3>
        </ErrorMessage>
      );
    }

    return this.props.children;
  }
}
