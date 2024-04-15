const onImgUpload = (e, width, height, setWrongImg, setImg, setImgSrc) => {
  const file = e.target.files[0];
  const thumbData = new FormData();

  thumbData.append('thumbnail', e.target.files[0]);

  e.stopPropagation();
  const selectedImg = [];
  const targetfiles = e.target.files;
  const targetfilesObj = [...targetfiles];
  targetfilesObj.map((file) => {
    return selectedImg.push(URL.createObjectURL(file));
  });
  if (targetfilesObj[0].type.slice(0, 5) === 'image') {
    var reader = new FileReader();
    reader.readAsDataURL(targetfilesObj[0]);
    reader.onload = function (e) {
      var img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        let imgHeight = this.height;
        let imgWidth = this.width;
        if (imgHeight === height && imgWidth == width) {
          setWrongImg(false);
          setImgSrc(e.target.result);
          setImg(file);
        } else {
          setWrongImg(true);
          thumbData.delete('thumbnail');
        }
      };
    };
  } else {
    setWrongImg(true);
  }
};

export default onImgUpload;
