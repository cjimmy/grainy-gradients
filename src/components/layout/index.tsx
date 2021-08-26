import styled from 'styled-components';

export const breakpoints = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

type RowProps = {
  alignItems?: string;
  flexDirection?: string;
};
export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${(props) => props.alignItems || 'flex-start'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
`;

interface ICol {
  off: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  span: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  padding?: number;
}
const nCols = 24;
export const Col = styled.div<ICol>`
  margin-left: ${(props) => (props.off.xs / nCols) * 100}%;
  width: ${(props) => (props.span.xs / nCols) * 100}%;
  padding: 0 ${(props) => props.gutterWidth * 0.5}px;

  @media screen and (min-width: ${breakpoints.sm}px) {
    margin-left: ${(props) => (props.off.sm / nCols) * 100}%;
    width: ${(props) => (props.span.sm / nCols) * 100}%;
  }
  @media screen and (min-width: ${breakpoints.md}px) {
    margin-left: ${(props) => (props.off.md / nCols) * 100}%;
    width: ${(props) => (props.span.md / nCols) * 100}%;
  }
  @media screen and (min-width: ${breakpoints.lg}px) {
    margin-left: ${(props) => (props.off.lg / nCols) * 100}%;
    width: ${(props) => (props.span.lg / nCols) * 100}%;
  }
  @media screen and (min-width: ${breakpoints.xl}px) {
    margin-left: ${(props) => (props.off.xl / nCols) * 100}%;
    width: ${(props) => (props.span.xl / nCols) * 100}%;
  }
  @media screen and (min-width: ${breakpoints.xxl}px) {
    margin-left: ${(props) => (props.off.xxl / nCols) * 100}%;
    width: ${(props) => (props.span.xxl / nCols) * 100}%;
  }
`;

type SpaceProps = {
  h: number;
  xsHeight?: number;
};
export const Space = styled.div<SpaceProps>`
  flex-shrink: 0;
  display: ${(props) => (props.h === 0 ? 'none' : 'block')};
  height: ${(props) => (props.h ? props.h : 10)}px;

  @media screen and (max-width: ${breakpoints.sm}px) {
    display: ${(props) => (props.xsHeight === 0 ? 'none' : 'block')};
    height: ${(props) => (props.xsHeight ? props.xsHeight : props.h)}px;
  }
`;

export const LeftCol = ({ children }) => (
  <Col
    off={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 }}
    span={{ xs: 16, sm: 16, md: 16, lg: 16, xl: 16, xxl: 16 }}
  >
    {children}
  </Col>
);

export const RightCol = ({ children }) => (
  <Col
    off={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 }}
    span={{ xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 }}
  >
    {children}
  </Col>
);
