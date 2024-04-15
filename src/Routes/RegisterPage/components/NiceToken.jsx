import React from 'react';
import axios from 'axios';

const NiceToken = () => {
  const clientId = `c0c756ed-1ec9-4a77-9ffd-31cd44f1404a`;
  const clientSecret = `9d91fe45d0886b3c973f127c59c43eee738176`;
  const auth = `Basic ` + btoa(`${clientId}:${clientSecret}`);
  let config = {
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': 'https://svc.niceapi.co.kr:22001/',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: auth,
    },
  };
  const getToken = () => {
    const form = new FormData();
    form.append('scope', 'default');
    form.append('grant_type', 'client_credentials');
    axios
      .post(
        `https://svc.niceapi.co.kr:22001/digital/niceid/oauth/oauth/token`,
        form,
        config
        // function (req, res) {
        //   res.header('Access-Control-Allow-Origin', '*');
        //   res.header(
        //     'Authorization',
        //     `Basic ` + btoa(`${clientId}:${clientSecret}`)
        //   );
        // }
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div>
      <div onClick={getToken}>get token</div>
    </div>
  );
};

export default NiceToken;
