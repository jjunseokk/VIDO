const validNickname = /^[\w|가-힣|\.\_\-]{1,10}$/;
const validEmail = /^\w+([\.-]?\w+)*(@)(\w|\.\_\-)*(\.\w{2,3})$/;
const validPwNo = /[^\(\)\"\"\'\'가-힣]{8,20}$/;
const validPwSpecial = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
const characterNeccessary = /[A-Z|a-z|0-9]+/;
const characterNeccessaryKor = /[A-Z|가-힣|a-z|0-9]+/;
const youtube = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
const instagram = /^(https?\:\/\/)?((www\.)?instagram\.com)\/.+$/;
const webpage =
  /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export {
  validNickname,
  validEmail,
  validPwNo,
  validPwSpecial,
  characterNeccessary,
  characterNeccessaryKor,
  youtube,
  instagram,
  webpage,
};
