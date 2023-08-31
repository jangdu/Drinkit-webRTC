const obj = {
  name: 'jyh',
  age: 23,
  married: true,
};

const cookies =
  '_ga_WY63T36LG5=GS1.1.1681746169.1.0.1681746169.0.0.0; _ga=GA1.1.685028362.1681746170; RefreshToken=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY5MzQxNjY1NCwiZXhwIjoxNjkzNTAzMDU0fQ.ttKYU470nAcJM_2wDmjo3dIXfHbpUnQDJxgzPkcOQuU; io=VlOf7wp7EKgN7bNCAAAa; AccessToken=Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY5MzQ5MTIxNiwiZXhwIjoxNjkzNDkxMjIxfQ.DmeR5jCdtR-fp7ry3M5JnAaigjmvT-1Sfs0Hw7cDtnk';

cookies.split('; ').forEach((cookie) => {
  const datas = cookie.split('=');
  console.log(datas);
});

const a = 5;

const d = [1, 2];
let b;
a === 4 ? (b = 3) : a === 5 ? (b = 3) : null;

console.log(a);
console.log(b);
console.log(d);
