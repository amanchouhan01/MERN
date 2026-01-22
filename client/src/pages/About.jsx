
import "./AboutMe.css";
import { useAuth } from '../store/Auth';
const AboutMe = ({
  name = "Aman Chouhan",
  role = "Full Stack Developer",
  tagline = "Building scalable, user-focused web applications",
  about = "I am a full stack developer with a strong focus on building clean, performant, and scalable web applications. I enjoy transforming complex problems into simple, intuitive solutions. My work emphasizes maintainability, accessibility, and modern best practices.",
  skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "REST APIs",
    "Git",
  ],
  profileImage = "/myphoto.jpeg",
  cvLink = "/CV.pdf", }


) => {
  const { user } = useAuth();
  return (
    <section className="about" aria-labelledby="about-heading">
      <div className="about-container">
        {/* Profile Image */}
        <div className="about-image">

          <img
            src={profileImage}
            alt={`${name} profile`}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="about-content">
          <h4>
            {user ? `Glad to have you here, ${user.username}.`: "Learn more about me on this page."}
          </h4>

          <h2 id="about-heading">{name}</h2>
          <h3>{role}</h3>
          <p className="about-tagline">{tagline}</p>

          <p className="about-text">{about}</p>

          {/* Skills */}
          <ul className="about-skills" aria-label="Technical skills">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          {/* Actions */}
          <div className="about-actions">
            <a
              href={cvLink}
              className="about-btn"
              aria-label="Download CV"
              download
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section >
  );
};

export default AboutMe;
