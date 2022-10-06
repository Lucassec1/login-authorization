import React, { useState } from 'react';

import { 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup, 
  signInWithEmailAndPassword,
  signOut,
  User 
} from 'firebase/auth';
import { auth } from '../../services/firebase';

import {
  Container,
  Form,
  Input,
  Title,
  Imgleft,
  ImgTopRight,
  ImgBottomRight,
  // ContBackground
} from './styles';

interface SignIn {
  email: string;
  password: string;
}

export function Login() {
  const [userGoogle, setUserGoogle] = useState<User | null>({} as User)
  const [userGithub, setUserGithub] = useState<User>({} as User)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleGoogleSignIn() {
    const providerGoogle = new GoogleAuthProvider();

    signInWithPopup(auth, providerGoogle)
      .then(result => {
        setUserGoogle(result.user);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleGithubSignIn() {
    const providerGithub = new GithubAuthProvider();

    signInWithPopup(auth, providerGithub)
      .then(res => {
        setUserGithub(res.user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleSignIn () {
    signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      console.log(res)
      setEmail('');
      setPassword('');
    })
    .catch(err => {
      console.log(err)
    })
  }

  function Signout() {
    signOut(auth)
    .then(response => {
      console.log('Signout successful!')
      setUserGoogle(null)
      // setUserGithub(null)
    })
    .catch(error => {
      console.log('Signout failed')
    });
  }

  return (
    <>
      <Container>
        <Form>
          <Title>Inscreva-se</Title>
          <div>
            <p>Email</p>
            <Input
              type="email"
              placeholder='Digite seu Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>Senha</p>
            <Input
              type="password"
              placeholder='Digite sua Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button onClick={handleSignIn}>Login</button>

          <button onClick={handleGoogleSignIn}>Google</button>
          <button onClick={handleGithubSignIn}>Github</button>
        </Form>

        <Imgleft />
        <ImgTopRight />
        <ImgBottomRight /> 
      </Container>
    </>
  );
}

export default Login;