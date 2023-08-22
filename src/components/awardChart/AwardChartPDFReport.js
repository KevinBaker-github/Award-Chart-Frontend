import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
	body: {
	  flexDirection: 'column',
	  backgroundColor: '#fff',
	  paddingTop: 35,
	  paddingBottom: 65,
	  paddingHorizontal: 35
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
        marginBottom: 3,
	},
	subtitle: {
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 40,
	},
	table: {
		display: "table", 
		width: "auto", 
		borderStyle: "solid", 
		borderWidth: 1, 
		borderRightWidth: 0, 
		borderBottomWidth: 0 
	}, 
	tableRow: {
		margin: "auto", 
		flexDirection: "row" 
	}, 
	tableCol: { 
		width: "16.66%", 
		borderStyle: "solid", 
		borderWidth: 1, 
		borderLeftWidth: 0, 
		borderTopWidth: 0 
	}, 
	tableCell: { 
		margin: "auto", 
		marginTop: 5, 
		fontSize: 10 
	}
});
  
const AwardChartPDFReport = ({title, tableRecords}) => {

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.title}>{title ? title : 'Award Charts Report'}</Text>
                <Text style={styles.subtitle}>Selected award chart records from the table.</Text>
                <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Category</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Reward Saver</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Standard</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Base Peak</Text> 
                        </View>
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>Premium</Text> 
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Premium Peak</Text> 
                        </View> 
                    </View>
                    {/* Table records mapping */}
                    { tableRecords.map((item, index) => (
                        <>
                            <View key={index} style={styles.tableRow}>
                                <View style={styles.tableCol}> 
                                    <Text style={styles.tableCell}>{item.category}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                    <Text style={styles.tableCell}>{item.rewardSaver.points}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                    <Text style={styles.tableCell}>{item.standard.points}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                    <Text style={styles.tableCell}>{item.basePeak.points}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                    <Text style={styles.tableCell}>{item.premium.points}</Text> 
                                </View>
                                <View style={styles.tableCol}> 
                                    <Text style={styles.tableCell}>{item.premiumPeak.points}</Text> 
                                </View>
                            </View> 
                        </>
                    ))}
                    
                </View>
            </Page>
        </Document>
    );
}

export default AwardChartPDFReport;