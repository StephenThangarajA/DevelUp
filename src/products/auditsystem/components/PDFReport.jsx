import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#dc2626',
    borderBottomStyle: 'solid',
  },
  title: {
    fontSize: 24,
    color: '#dc2626',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6c757d',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#495057',
    fontWeight: 'bold',
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
    borderLeftStyle: 'solid',
    paddingLeft: 10,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 10,
    color: '#333333',
  },
  listItem: {
    fontSize: 11,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
    borderLeftStyle: 'solid',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    width: '23%',
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 10,
    color: '#6c757d',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#e9ecef',
    borderTopStyle: 'solid',
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 10,
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statusCompleted: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusDraft: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  statusPending: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderStyle: 'solid',
    borderRadius: 4,
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    borderBottomStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    borderBottomStyle: 'solid',
  },
  tableCell: {
    fontSize: 10,
    flex: 1,
  },
  tableHeaderCell: {
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
    color: '#495057',
  },
});

// PDF Report Component
const PDFReport = ({ reportData, reportType = 'summary' }) => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const totalAudits = reportData?.audits ?? 0;
  const totalFindings = reportData?.findings ?? 0;
  const criticalFindings = reportData?.criticalFindings ?? 0;
  const completionRate = reportData?.completionRate ?? 0;
  const audit = reportData?.audit;
  const auditFindings = reportData?.auditFindings ?? [];
  const resolvedFindings = auditFindings.filter((finding) => finding.status === 'resolved').length;
  const openFindings = auditFindings.length - resolvedFindings;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Audit Report</Text>
          <Text style={styles.subtitle}>
            Generated: {currentDate} at {currentTime}
          </Text>
          <Text style={styles.subtitle}>
            Report Type: {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
          </Text>
        </View>

        {/* Metrics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{totalAudits}</Text>
              <Text style={styles.metricLabel}>Total Audits</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{totalFindings}</Text>
              <Text style={styles.metricLabel}>Total Findings</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{criticalFindings}</Text>
              <Text style={styles.metricLabel}>Critical Findings</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{completionRate}%</Text>
              <Text style={styles.metricLabel}>Completion Rate</Text>
            </View>
          </View>
        </View>

        {/* Key Findings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Findings</Text>
          {auditFindings.length === 0 ? (
            <Text style={styles.text}>No findings recorded for this scope.</Text>
          ) : (
            auditFindings.slice(0, 5).map((finding) => (
              <View
                key={finding.id}
                style={[
                  styles.listItem,
                  {
                    borderLeftColor:
                      finding.severity === 'critical'
                        ? '#D32F2F'
                        : finding.severity === 'high'
                          ? '#F57C00'
                          : finding.severity === 'medium'
                            ? '#FBC02D'
                            : '#388E3C',
                  },
                ]}
              >
                <Text>
                  {finding.title} · {finding.severity.toUpperCase()} ({finding.status})
                </Text>
                <Text>{finding.description}</Text>
              </View>
            ))
          )}
        </View>

        {/* Audit Metrics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audit Metrics</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Scope: </Text>
            {audit ? audit.title : `${totalAudits} audits`}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Completion Rate: </Text>
            {completionRate}% of planned audits completed
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Findings Status: </Text>
            {resolvedFindings} resolved · {openFindings} open
          </Text>
          {audit && (
            <Text style={styles.text}>
              <Text style={{ fontWeight: 'bold' }}>Client / Owner: </Text>
              {audit.client} — {audit.auditor}
            </Text>
          )}
        </View>

        {/* Recent Reports Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          {audit ? (
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Finding</Text>
                <Text style={styles.tableHeaderCell}>Severity</Text>
                <Text style={styles.tableHeaderCell}>Status</Text>
                <Text style={styles.tableHeaderCell}>Owner</Text>
              </View>
              {auditFindings.slice(0, 6).map((finding) => (
                <View key={finding.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{finding.title}</Text>
                  <Text style={styles.tableCell}>{finding.severity}</Text>
                  <Text
                    style={[
                      styles.statusBadge,
                      finding.status === 'resolved'
                        ? styles.statusCompleted
                        : finding.status === 'open'
                          ? styles.statusPending
                          : styles.statusDraft,
                    ]}
                  >
                    {finding.status}
                  </Text>
                  <Text style={styles.tableCell}>{finding.assignee || 'Unassigned'}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.text}>This summary combines {totalAudits} audits captured in the platform.</Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This report was generated automatically by the Audit Management System.
            For questions or clarifications, contact the audit team.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Download Button Component
export const PDFDownloadButton = ({ reportData, reportType = 'summary', children }) => {
  const fileName = `audit-report-${reportType}-${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <PDFDownloadLink
      document={<PDFReport reportData={reportData} reportType={reportType} />}
      fileName={fileName}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {children}
    </PDFDownloadLink>
  );
};

export default PDFReport;