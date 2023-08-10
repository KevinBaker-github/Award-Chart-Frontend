import axiosConfig from '../../services/axiosConfig'


export const calculate = async (data) => {
    try {
		return await axiosConfig.post('/awardCharts/dynamicPricing', data);
	} catch (err) {
		console.log(err);
		throw err;
	}
}