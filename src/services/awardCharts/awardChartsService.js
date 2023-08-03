import axiosConfig from '../../services/axiosConfig'

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