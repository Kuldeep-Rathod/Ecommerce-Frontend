import { teamMembers } from '../data/teamMembers';

const AboutUs = () => {
    return (
        <div className='about-page'>
            <section className='mission-section'>
                <div className='container'>
                    <div className='mission-content'>
                        <h2>Our Mission</h2>
                        <p>
                            We're committed to providing high-quality products
                            with exceptional customer service, making shopping
                            simple, enjoyable, and accessible for everyone.
                        </p>
                    </div>
                    <div className='stats-grid'>
                        <div className='stat-card'>
                            <span className='stat-number'>10K+</span>
                            <span className='stat-label'>Happy Customers</span>
                        </div>
                        <div className='stat-card'>
                            <span className='stat-number'>500+</span>
                            <span className='stat-label'>Products</span>
                        </div>
                        <div className='stat-card'>
                            <span className='stat-number'>24/7</span>
                            <span className='stat-label'>Support</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='team-section'>
                <div className='container'>
                    <h2>Meet Our Team</h2>
                    <div className='team-grid'>
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className='team-card'
                            >
                                <img
                                    src={member.photo}
                                    alt={member.name}
                                    onError={(e) =>
                                        (e.currentTarget.src =
                                            '/default-avatar.jpg')
                                    }
                                />
                                <h3>{member.name}</h3>
                                <p className='position'>{member.position}</p>
                                <p className='bio'>{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className='values-section'>
                <div className='container'>
                    <h2>Our Core Values</h2>
                    <div className='values-grid'>
                        <div className='value-card'>
                            <div className='value-icon'>💎</div>
                            <h3>Quality</h3>
                            <p>
                                We source only the finest materials for our
                                products
                            </p>
                        </div>
                        <div className='value-card'>
                            <div className='value-icon'>❤️</div>
                            <h3>Customer First</h3>
                            <p>Your satisfaction is our top priority</p>
                        </div>
                        <div className='value-card'>
                            <div className='value-icon'>♻️</div>
                            <h3>Sustainability</h3>
                            <p>Eco-friendly practices in everything we do</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
