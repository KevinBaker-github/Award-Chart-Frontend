import axiosConfig from '../../services/axiosConfig'
import { AxiosRequestConfig } from 'axios';

export const listAwardCharts = async () => {
    try {
		return await axiosConfig.get('/awardCharts');
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export const createAwardChart = (data) => {
    return axiosConfig.post('/awardCharts', data)
		.then(res => {
			
		})
		.catch(err => {
			console.log(err);
            throw err;
		})
}

export const editAwardChart = (data) => {
    return axiosConfig.put('/awardCharts', data)
		.then(res => {
			
		})
		.catch(err => {
			console.log(err);
            throw err;
		})
}


export const deleteAwardChart = (category) => {
    return axiosConfig.delete('/awardCharts/' + category)
		.then(res => {
			
		})
		.catch(err => {
			console.log(err);
			throw err;
		})
}

export const exportAwardChartCsv = async (data) => {
    const headers = {'Content-Type': 'application/json'};
    const config = {responseType: 'blob', headers};
    
    try {
		const response = await axiosConfig.post('/exports/awardChart/csv', data, config)
        
        const fileName = `award-charts-${Date.now()}.xlsx`;

        const url = URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
		
    } catch (error) {
        throw Error(error);
    }
}