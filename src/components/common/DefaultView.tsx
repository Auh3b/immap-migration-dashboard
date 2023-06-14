import Header from './header/Index';

export default function DefaultView({ children }: { children: JSX.Element }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
