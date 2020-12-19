import CircularProgress from '@material-ui/core/CircularProgress';

const Preloader = () =>
{
    return (
        <div id="preloader">
            <CircularProgress size='3rem' />
        </div>
    );
};

export default Preloader;
