import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 20, // Başlık yazı boyutu
          fontWeight: 'bold'
        }}
        text2Style={{
          fontSize: 16, // Açıklama yazı boyutu
          color: 'gray'
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 20, // Başlık yazı boyutu
          fontWeight: 'bold'
        }}
        text2Style={{
          fontSize: 16, // Açıklama yazı boyutu
          color: 'gray'
        }}
      />
    ),
   
  };
  