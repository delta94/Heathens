import Head from 'next/head';
import { Fragment } from 'react';
import Navbar from './Navbar';

const Layout = ( { children } ) =>
{
    return (
        <Fragment>
            <Head>
                <meta charSet='utf-8' />
                <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
                />
                <meta name='description' content='realt time chat app' />
                <meta name='keywords' content='amoeba' />
                <title>Amoeba</title>
                {/* <link rel='manifest' href='/manifest.json' />
                <link href='./icons/js.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='./icons/js.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel='apple-touch-icon' href='/apple-icon.png' /> */}
                <meta name='theme-color' content='#000' />
            </Head>
            <Navbar />
            {children }
        </Fragment>
    );
};


export default Layout;
