var qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");


let scanning = false;
const app = new App();
qrcode.callback = ((res) => {
  if (res) {
    res = res.split('ethereum:')[1];
    console.log(res);
    //scanning = false;
    console.log("asdsad");

    (async function(){
      const auth = await app.authorization(res);
      console.log("asd");
      if (Auth.checkPermissions(auth)) {
        const photoElement = document.getElementById("photo");
        console.log("auth:",auth);
        photoElement.src = Auth.getClientURLPhoto(auth);
        console.log("Auth.getClientURLPhoto(auth)", Auth.getClientURLPhoto(auth));
        photoElement.display = "block";
      } else {
        window.alert("User not Authorized");
      }
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
      load();
      //canvasElement.hidden = true;
    })();


  }
});
function load(){
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;

      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
}

document.body.onload = () => {
  load();
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
