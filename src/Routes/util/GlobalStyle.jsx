import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
li {
  list-style: none;
}

button{
  cursor: pointer;
  background: none;
  border: none;
  &:disabled{
    cursor: default;
  }
}
input{
  border: none;
  &:focus{
    outline: none;
    &::placeholder{
      opacity: 0;
    }
  }
}

textarea{
  &:focus{
    &::placeholder{
      opacity: 0;
    }
  }
}

body {
  overflow-x: hidden;
  -ms-overflow-style: none;
  // scrollbar-width: none;
}

input[type=file]{
  cursor: pointer;
  &::-webkit-file-upload-button{
    opacity: 0;
    cursor: pointer;
  }
  -webkit-appearance: none; /* 네이티브 외형 감추기 */
  -moz-appearance: none;
  opacity: 0;
    -moz-opacity: 0;
}


`;
export default GlobalStyle;
