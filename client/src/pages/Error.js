import notFound from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <img src={notFound} alt='not found' />
                <h3>ohh! page not found</h3>
                <p>we can't seem to find the page you're looking for</p>
                <Link to='/'>back home</Link>
            </div>
        </Wrapper>
    )
}

export default Error