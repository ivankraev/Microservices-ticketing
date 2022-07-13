import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'


const AppComponent = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

AppComponent.getInitialProps = async appContext => {
    console.log(appContext);
    const client = buildClient(appContext.ctx)
    const { data } = await client.get('/api/users/currentuser')
    let pageProps = {}
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return data
}

export default AppComponent