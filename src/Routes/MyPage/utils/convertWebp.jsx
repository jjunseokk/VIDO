import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const convertWebp = (img) => {
  (async () => {
    await imagemin([img], {
      destination: 'build/images',
      plugins: [imageminWebp({ quality: 50 })],
    });

    console.log('Images optimized');
  })();
};

export default convertWebp;
