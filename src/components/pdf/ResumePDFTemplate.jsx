import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import phoneIcon from '../../assets/icons/phone.png';
import mailIcon from '../../assets/icons/mail.png';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import globeIcon from '../../assets/icons/globe.png';

// No custom font registration needed for Times-Roman as it's a core PDF font

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.2,
    color: '#000000',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 4,
    fontSize: 9,
    marginBottom: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 9,
    height: 9,
    marginRight: 3,
  },
  section: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 1,
    marginBottom: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
  },
  itemDate: {
    fontSize: 9.5,
    fontFamily: 'Times-Bold',
  },
  itemSubTitle: {
    fontSize: 9.5,
    marginBottom: 2,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 5,
  },
  bullet: {
    width: 12,
    fontSize: 10,
  },
  bulletContent: {
    flex: 1,
    fontSize: 9.5,
    textAlign: 'justify',
    lineHeight: 1.3,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
    rowGap: 2,
  },
  skillItem: {
    width: '14.28%', // 7 columns
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillBullet: {
    width: 10,
    fontSize: 8,
    textAlign: 'center',
  },
  skillText: {
    fontSize: 9,
  },
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

  const stripHtml = (html) => {
    if (!html) return [];

    // Clean up basic entities first
    let cleanHtml = html.replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Check if it contains <li> tags
    if (cleanHtml.includes('<li')) {
      const liMatches = cleanHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
      if (liMatches) {
        return liMatches.map(li => li.replace(/<[^>]+>/g, '').trim()).filter(t => t);
      }
    }

    // Otherwise split by common block delimiters
    return cleanHtml
      .split(/<\/p>|<p>|<br\s*\/?>|\n/gi)
      .map(line => line.replace(/<[^>]+>/g, '').trim())
      .filter(line => line.length > 0);
  };

  const renderBullets = (html) => {
    const lines = stripHtml(html);
    return lines.map((line, i) => (
      <View key={i} style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletContent}>{line}</Text>
      </View>
    ));
  };

  const allSkills = [
    ...(technicalSkills.languages ? technicalSkills.languages.split(',').map(s => s.trim()) : []),
    ...(technicalSkills.technologies_framework ? technicalSkills.technologies_framework.split(',').map(s => s.trim()) : []),
    ...(technicalSkills.devTools ? technicalSkills.devTools.split(',').map(s => s.trim()) : [])
  ].filter(s => s);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name || 'Your Name'}</Text>

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
          </View>

          <View style={styles.contactInfo}>
            {personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Image src={linkedinIcon} style={styles.icon} />
                <Text>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</Text>
              </View>
            )}
            {personalInfo.github && (
              <View style={styles.contactItem}>
                <Image src={githubIcon} style={styles.icon} />
                <Text>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Education Section */}
        {toggle.educationToggle && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 4 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree || 'Degree'}</Text>
                  {edu.grade && <Text style={styles.itemDate}>CGPA - {edu.grade}</Text>}
                </View>
                <Text style={styles.itemSubTitle}>{edu.college || 'College Name'}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {toggle.experienceToggle && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {exp.role} <Text style={{ fontFamily: 'Times-Roman', fontWeight: 'normal' }}>({exp.company})</Text>
                  </Text>
                  <Text style={styles.itemDate}>({exp.duration})</Text>
                </View>
                {renderBullets(exp.summary)}
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {toggle.projectsToggle && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>
                    {project.projectTitle} | <Text style={{ fontFamily: 'Times-Roman', fontWeight: 'normal', fontSize: 9 }}>{project.tech}</Text>
                  </Text>
                </View>
                {renderBullets(project.summary)}
              </View>
            ))}
          </View>
        )}

        {/* Extra/Achievements Section */}
        {toggle.extraToggle && extra && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {renderBullets(extra)}
          </View>
        )}

        {/* Skills Section */}
        {toggle.skillsToggle && allSkills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {allSkills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDFTemplate;