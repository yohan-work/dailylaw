// existing content...

function MyApp({ Component, pageProps }) {
  return (<>
    <Component {...pageProps} />
    <LoginForm/>
  </>
);
}
export default MyApp;
