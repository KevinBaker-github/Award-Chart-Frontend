import useAuthUser from "../hook/getUser";

const Profile = () => {
	const userInfo = useAuthUser();
	console.log(userInfo);

	return (
		<div className="bg-deep-orange-600">
			<h2>My Profile Details</h2>
			<section>
				<ul>
					<li>Username: {userInfo?.preferred_username}</li>
					<li>Email: {userInfo?.email}</li>
					<li>Full Name: {userInfo?.name}</li>
					<li>Email Verified: {userInfo?.email_verified ? "Yes" : "No"}</li>
					<li>Zone: {userInfo?.zoneinfo}</li>
				</ul>
			</section>
		</div>
	);
};

export default Profile;