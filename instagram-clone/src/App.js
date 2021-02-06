import React, { useState, useEffect } from 'react';
import logo from './logo-doodle.png';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';

// Modal start

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// Modal end

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //user has logged in...
        setUser(authUser);

        if (authUser.displayName) {
          //dont update username
        } else {
          //if we just created someone
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        //user has logged out...
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = event => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className='app'>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <img className='app__headerImage' src={logo} alt='logo' />
            <Input
              type='text'
              placeholder='username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              type='text'
              placeholder='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type='password'
              placeholder='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type='submit' onClick={signUp}>
              Sign Up
            </button>
          </form>
        </div>
      </Modal>

      <div className='app__header'>
        <img className='app__headerImage' src={logo} alt='logo' />
      </div>
      <button onClick={() => setOpen(true)}>Sign Up</button>

      <h1>Hello world</h1>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
