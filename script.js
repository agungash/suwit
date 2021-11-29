function getPilihanComputer() {
  const computer = Math.random();
  if (computer < 0.34) return "gajah";
  if (computer >= 0.34 && computer <= 0.67) return "orang";
  return "semut";
}

function getHasil(computer, player) {
  if (player == computer) return "SERI";
  if (player == "gajah") return computer == "orang" ? "MENANG" : "KALAH";
  if (player == "orang") return computer == "gajah" ? "KALAH" : "MENANG";
  if (player == "semut") return computer == "orang" ? "KALAH" : "MENANG";
}

let nyawaCom = 3;
let nyawaPlayer = 3;
function papanNyawa(hasil) {
  if (hasil == "MENANG") return (nyawaPlayer += 1), (nyawaCom -= 1);
  if (hasil == "KALAH") return (nyawaCom += 1), (nyawaPlayer -= 1);
  if (hasil == "SERI") return nyawaCom, nyawaPlayer;
}

function victory() {
  const victory = document.querySelector("body div");
  victory.classList.add("overlay");
  victory.innerHTML = "VICTORY";
}

function defeat() {
  const defeat = document.querySelector("body div");
  defeat.classList.add("overlay");
  defeat.innerHTML = "DEFEAT";
  defeat.style.color = "red";
}

function putar() {
  const imgComputer = document.querySelector(".img-computer");
  const gambar = ["gajah", "semut", "orang"];
  let i = 0;
  const waktuMulai = new Date().getTime();
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;
      return;
    }
    imgComputer.setAttribute("src", "gambar/" + gambar[i++] + ".png");
    if (i == gambar.length) i = 0;
  }, 100);
}

const img = document.querySelectorAll("li img");
img.forEach(function (pil) {
  pil.addEventListener("click", function () {
    const pilComputer = getPilihanComputer();
    const pilPlayer = pil.className;
    const hasil = getHasil(pilComputer, pilPlayer);
    putar();
    papanNyawa(hasil);
    setTimeout(function () {
      const gComputer = document.querySelector(".img-computer");
      gComputer.setAttribute("src", "gambar/" + pilComputer + ".png");
      const info = document.querySelector(".info");
      info.innerHTML = hasil;
      const nyawaComputer = document.querySelector(".nyawaComp");
      nyawaComputer.innerHTML = "Nyawa : " + nyawaCom;
      const nyawaUser = document.querySelector(".nyawaPlayer");
      nyawaUser.innerHTML = "Nyawa : " + nyawaPlayer;
      if (nyawaCom == 0) {
        victory();
      }
      if (nyawaPlayer == 0) {
        defeat();
      }
    }, 1000);
  });
});
