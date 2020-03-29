import * as Style from './ButtonStyle';

export default ({ txt, className, onClick, children }) => {
  return (
    <Style.Button className={`${className}`} onClick={onClick}>
      {txt}
      {children ? children : ''}
    </Style.Button>
  );
}
