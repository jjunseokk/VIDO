import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const makePdf = {
  viewWithPdf: async () => {
    // html to imageFile
    const imageFile = await makePdf._converToImg();

    // imageFile to Pdf
    const pdf = makePdf._converToPdf(imageFile);

    // makePdf.sendToServer(pdf)
  },
  _converToImg: async () => {
    // html to imageFile
    const paper = document.querySelector('.div_container > .div_paper');

    const canvas = await html2canvas(paper, { scale: 2 });
    const imageFile = canvas.toDataURL('image/png', 1.0);

    return imageFile;
  },
  _converToPdf: (imageFile) => {
    // imageFile to pdf

    const paper = document.querySelector('.div_container > .div_paper');
    const size = [paper.offsetWidth * 0.265, paper.offsetHeight * 0.265];
    console.log(size);
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    console.log([pageWidth, pageHeight]);
    if (size[1] < pageHeight) {
      doc.addImage(
        imageFile,
        'JPEG',
        (pageWidth - size[0]) / 2,
        0,
        size[0],
        size[1]
      );
    } else {
      doc.addImage(
        imageFile,
        'JPEG',
        (pageWidth - (size[0] / size[1]) * pageHeight) / 2,
        0,
        (size[0] / size[1]) * pageHeight,
        pageHeight
      );
    }

    // doc.save("test.pdf")

    window.open(doc.output('bloburl'));

    const pdf = new File([doc.output('blob')], 'test.pdf', {
      type: 'application/pdf',
    });

    return pdf;
  },
  // _sendToServer: async (pdf) => {
  //     const formData = new FormData();
  //     formData.append("file", pdf);
  //     formData.append("type", "pdf");
  //     formData.append("name", "test");

  //     const res = await axios.post("/pdf/upload_file", formData, {
  //         headers: {
  //             "Content-Type": "multipart/form-data",
  //         },
  //     });

  //     if (res.data.code === 1) {
  //         window.open(`${util.mode()}${res.data.link}`);
  //     }
  //     console.log({ res });

  //     setTimeout(() => {
  //         makePdf._isLoading = false;
  //     }, 2000);
  // }
};

export default makePdf;
