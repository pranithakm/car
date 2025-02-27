import React from 'react';
import './AboutUs.css';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Max Mitchell',
    position: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Sales Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256'
  },
  {
    id: '3',
    name: 'David Brown',
    position: 'Technical Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256'
  },
  {
    id: '4',
    name: 'Michael Turner',
    position: 'Customer Relations',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256'
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-page">
      <div className="about-hero-section">
        <h1>About us</h1>
      </div>

      <div className="about-content-section">
        <section className="about-journey-section">
          <h2><span className="about-accent">|</span> Our Journey</h2>
          <div className="about-journey-content">
            <div className="about-journey-text">
              <p>
                We started our journey with a simple mission: to revolutionize the car buying experience. 
                Our platform brings together sellers and buyers in a seamless marketplace, making it easier 
                than ever to find your perfect vehicle.
              </p>
            </div>
            <div className="about-stats">
              <div className="about-stat-item">
                <h3>200+</h3>
                <p>Active Dealers</p>
              </div>
              <div className="about-stat-item">
                <h3>10k+</h3>
                <p>Registered Users</p>
              </div>
              <div className="about-stat-item">
                <h3>15+</h3>
                <p>Years of Experience</p>
              </div>
            </div>
            <div className="about-journey-image">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600" 
                alt="Car speedometer showing our journey progress"
              />
            </div>
          </div>
        </section>

        <section className="about-values-section">
          <h2><span className="about-accent">|</span> Our Values</h2>
          <div className="about-values-grid">
            <div className="about-value-item">
              <div className="about-value-icon">🤝</div>
              <h3>Trust</h3>
              <p>Building strong relationships based on transparency and reliability in every transaction.</p>
            </div>
            <div className="about-value-item">
              <div className="about-value-icon">⭐</div>
              <h3>Excellence</h3>
              <p>Striving to provide the highest standards of service and customer satisfaction.</p>
            </div>
            <div className="about-value-item">
              <div className="about-value-icon">🌟</div>
              <h3>Client-Centric</h3>
              <p>Putting our clients' needs first and ensuring their success is our priority.</p>
            </div>
            <div className="about-value-item">
              <div className="about-value-icon">🌍</div>
              <h3>Our Commitment</h3>
              <p>Dedicated to creating a sustainable and environmentally conscious automotive marketplace.</p>
            </div>
          </div>
        </section>

        <section className="about-team-section">
          <h2><span className="about-accent">|</span> Meet Our Team</h2>
          <p className="about-team-intro">
            Our team of experts is driven by the dedication and expertise of our team. Get to know the people behind our
            mission to make your car search simpler.
          </p>
          <div className="about-team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="about-team-member">
                <div className="about-member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-cta-section">
          <div className="about-cta-content">
            <h2>Do you have Something to Sell through Us?</h2>
            <button className="about-cta-button">Sell your car today</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
