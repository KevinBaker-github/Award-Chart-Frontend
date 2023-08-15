import axiosConfig from '../../services/axiosConfig'

export const listProperties = async () => {//TODO: Change this later
    try {
		return await axiosConfig.get('/properties');
	} catch (err) {
		console.log(err);
		throw err;
	}
}