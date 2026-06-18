import { Button, Html } from '@react-email/components';
import * as React from 'react';
interface emailProps{
  appname:string;
  email:string;
  url:string;
}
export default function Email({ appname, email, url }: emailProps) {
  return (
    <Html>

      <h1>Welcome, {email}!</h1>
      <p>Thanks for joining us!</p >
      <h2>{appname}</h2>
      <p>Para activar tu cuenta, haz clic en el siguiente botón:</p>
      <Button
        href={url}
        style={{ background: '#000', color: '#fff', padding: '12px 20px' }}
      >
        Verificate Account
      </Button>
      <p>Si no realizaste este registro, puedes ignorar este mensaje.</p>
    </Html>
  );
}