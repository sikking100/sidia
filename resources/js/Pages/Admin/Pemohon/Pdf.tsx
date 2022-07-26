
import React from 'react'
import { Applicant } from '@/Interface/Interface'
import pdf from '@react-pdf/renderer'
const { Page, Text, Image, View, Document, StyleSheet } = pdf

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    'bacbackgroundColor': '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

interface Props {
  application: Applicant
}

export default function DocumentPdf(prop: Props) {
  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        <View style={styles.section}>
          <Text>NIK : {prop.application.id_card_number}</Text>
          <Text>Name : {prop.application.name}</Text>
          <Text>Nomor HP : {prop.application.phone}</Text>
          <Text>Email : {prop.application.email}</Text>
          <Text>Keterangan : {prop.application.description}</Text>
        </View>
      </Page>
      {prop.application.file_id_card ? <Page size={'A4'} style={styles.page}>
        <View style={styles.section}>
          <Text>File Ktp</Text>
          <Image src={`../../applicant/${prop.application.file_id_card}`} />
        </View>
      </Page> : null}
      {prop.application.file_id_card ? <Page size={'A4'} style={styles.page}>
        <View style={styles.section}>
          <Text>File Ktp</Text>
          <Image src={`../../applicant/${prop.application.file_id_card}`} />
        </View>
      </Page> : null}

      {prop.application.file_lost_letter ? <Page size={'A4'} style={styles.page}>
        <View style={styles.section}>
          <Text>File Surat Keterangan Hilang</Text>
          <Image src={`../../applicant/${prop.application.file_lost_letter}`} />
        </View>
      </Page> : null}

    </Document>
  )
}
