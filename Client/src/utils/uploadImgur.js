import axios from "axios";

function NewImage(e, Contents, setContents) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          const img = base64.split(",")[1].toString();
          axios
            .post("https://api.imgur.com/3/image", img, {
              headers: {
                Authorization: "Client-ID 3428d1d51b9b86e",
                Accept: "application/json",
              },
            })
            .then((response) => {
              let imgTag = `
  
  [${response.data.data.id}](${response.data.data.link})
  
  `;
              setContents(Contents + imgTag);
              resolve(response.data.data);
            });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch (e) {
      reject("이미지 업로드에 실패했습니다.");
    }
  });
}

export default NewImage;
