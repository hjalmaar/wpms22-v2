import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';
import {Avatar, Button, Card, Icon, Image, ListItem, Text} from '@rneui/themed';



const Profile = () => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      console.log('avatarArray', user, avatarArray);
      const avatarFile = avatarArray.pop();
      setAvatar(mediaUrl + avatarFile.filename);
    } catch (error) {
      console.error('fetchAvatar', error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);


  console.log('Profile', isLoggedIn);

  const logOut = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Profile - logOut', error);
    }
  };

  return (
    <Card>
      <Card.Title>
        User: {user.username} (id: {user.user_id})
      </Card.Title>
      <Card.Image source={{uri: avatar}} />
      <ListItem>
        <Avatar
          icon={{name: 'contact-mail', type: 'material', }}
          containerStyle={{backgroundColor: 'aaa'}}
        />
        <Text>{user.email}</Text>
      </ListItem>
      <ListItem>
        <Text>Full name: {user.full_name}</Text>
      </ListItem>
      <ListItem>
        <Text>User since: {user.time_created}</Text>
      </ListItem>
      <Button title="Logout" onPress={logOut} />
    </Card>
  );
};


export default Profile;
