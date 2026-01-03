import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import phoneIcon from '../../assets/icons/phone.png';
import mailIcon from '../../assets/icons/mail.png';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import globeIcon from '../../assets/icons/globe.png';

// Register fonts for better typography
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/Helvetica.ttf' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/Helvetica-Bold.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000000',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    fontSize: 9,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 3,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    paddingBottom: 4,
    marginBottom: 8,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  educationTitle: {
    fontWeight: 'bold',
  },
  educationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  experienceTitle: {
    fontWeight: 'bold',
  },
  experienceCompany: {
    fontStyle: 'italic',
  },
  experienceLocation: {
    fontSize: 10,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  projectTitle: {
    fontWeight: 'bold',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillCategory: {
    marginBottom: 6,
    width: '50%',
  },
  skillTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 2,
  },
  skillText: {
    fontSize: 9,
  },
  extraText: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  link: {
    color: '#0000EE',
    textDecoration: 'underline',
  }
});

const ResumePDFTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    education,
    experience,
    projects,
    technicalSkills,
    extra,
    toggle
  } = resumeData;

  const formatSkills = (skillsString) => {
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name || 'Your Name'}</Text>
          <Text style={styles.title}>{personalInfo.title || 'Professional Title'}</Text>

          <View style={styles.contactInfo}>
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Image src={phoneIcon} style={styles.icon} />
                <Text>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Image src={mailIcon} style={styles.icon} />
                <Text>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Image src={linkedinIcon} style={styles.icon} />
                <Text>LinkedIn</Text>
              </View>
            )}
            {personalInfo.github && (
              <View style={styles.contactItem}>
                <Image src={githubIcon} style={styles.icon} />
                <Text>GitHub</Text>
              </View>
            )}
            {personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Image src={globeIcon} style={styles.icon} />
                <Text>Portfolio</Text>
              </View>
            )}
          </View>
        </View>

        {/* Education Section */}
        {toggle.educationToggle && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.educationTitle}>
                    {edu.college || 'College Name'} - {edu.degree || 'Degree'}
                  </Text>
                  <Text>{edu.duration || 'Duration'}</Text>
                </View>
                <View style={styles.educationDetails}>
                  <Text>{edu.grade ? `Grade: ${edu.grade}` : ''}</Text>
                  <Text>{edu.location || 'Location'}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {toggle.experienceToggle && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>
                    {exp.role || 'Job Title'}
                  </Text>
                  <Text>{exp.duration || 'Duration'}</Text>
                </View>
                <View style={styles.educationDetails}>
                  <Text style={styles.experienceCompany}>
                    {exp.company || 'Company Name'}
                  </Text>
                  <Text>{exp.location || 'Location'}</Text>
                </View>
                <Text style={{ marginTop: 4, fontSize: 10 }}>
                  {exp.summary || 'Job description and responsibilities...'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {toggle.projectsToggle && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>
                    {project.projectTitle || 'Project Name'}
                  </Text>
                  <Text>{project.duration || 'Duration'}</Text>
                </View>
                <Text style={{ fontSize: 10, marginBottom: 2 }}>
                  {project.summary || 'Project description...'}
                </Text>
                <Text style={{ fontSize: 9 }}>
                  Tech Stack: {project.tech || 'Technologies used'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {toggle.skillsToggle && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              {technicalSkills.languages && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Languages:</Text>
                  <Text style={styles.skillText}>{technicalSkills.languages}</Text>
                </View>
              )}
              {technicalSkills.technologies_framework && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Technologies:</Text>
                  <Text style={styles.skillText}>{technicalSkills.technologies_framework}</Text>
                </View>
              )}
              {technicalSkills.devTools && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Tools:</Text>
                  <Text style={styles.skillText}>{technicalSkills.devTools}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Extra Section */}
        {toggle.extraToggle && extra && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <Text style={styles.extraText}>{extra}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDFTemplate;