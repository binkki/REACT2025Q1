export const convertImageToBase64 = (
  fileList: FileList | null | undefined
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    if (fileList) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileList[0]);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    } else reject('Please select image');
  });
};
