import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found'>
            <div className='not-found__container'>
                <div className='not-found__content'>
                    <div className='not-found__graphic'>
                        <svg
                            viewBox='0 0 200 200'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fill='#F3F4F6'
                                d='M42.8,-53.1C54.8,-42.6,63.2,-28.2,65.9,-12.5C68.6,3.2,65.6,20.2,55.4,33.2C45.2,46.2,27.8,55.2,8.6,60.8C-10.6,66.4,-31.6,68.6,-46.5,59.6C-61.4,50.6,-70.2,30.4,-71.8,9.8C-73.5,-10.9,-68,-32,-54.1,-45.1C-40.2,-58.2,-18.1,-63.3,-0.3,-63C17.5,-62.7,35,-57,42.8,-53.1Z'
                                transform='translate(100 100)'
                            />
                            <text
                                x='100'
                                y='110'
                                textAnchor='middle'
                                fontSize='60'
                                fill='#6B7280'
                                fontWeight='bold'
                            >
                                404
                            </text>
                        </svg>
                    </div>

                    <h1 className='not-found__title'>Page Not Found</h1>
                    <p className='not-found__message'>
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>

                    <div className='not-found__actions'>
                        <button
                            onClick={() => navigate(-1)}
                            className='not-found__button not-found__button--secondary'
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className='not-found__button not-found__button--primary'
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
