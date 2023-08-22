import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import AwardChartPDFReport from '../../components/awardChart/AwardChartPDFReport';

const generateDataTablePdfDocument = async (documentData, fileName) => {
        const blob = await pdf((
            <AwardChartPDFReport
                title='Award Charts Report'
                tableRecords={documentData}
            />
        )).toBlob();
        saveAs(blob, fileName);
};

export default generateDataTablePdfDocument;