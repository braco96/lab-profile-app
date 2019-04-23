// Displays the logged in user's profile information

import { useContext, useEffect, useState } from 'react';
import authService from '../services/auth.service';
import { AuthContext } from '../context/auth.context';

function ProfilePage() {
  const { user, logOutUser } = useContext(AuthContext); // access user data and logout function
  const [image, setImage] = useState(''); // store selected file URL

  // When component mounts fetch the most recent user data
  useEffect(() => {
    const fetchUser = async () => {
      const response = await authService.getCurrentUser();
      setImage(response.data.image);
    };
    fetchUser();
  }, []);

  // Handle file selection and upload to the server
  const handleFileChange = async (e) => {
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0]);

    try {
      const response = await authService.uploadPhoto(uploadData);
      // After uploading update user image
      await authService.editUser({ image: response.data.imageUrl });
      setImage(response.data.imageUrl);
    } catch (err) {
      console.error('Error uploading image', err);
    }
  };

  if (!user) return <p>Loading...</p>; // show loading state while user data loads

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      {image && <img src={image} alt="profile" width="100" />}
      <br />
      {/* Input to upload new profile picture */}
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={logOutUser}>Log out</button>
    </div>
  );
}

export default ProfilePage;
