/*==============================================
-phần của em có thêm 2 chức năng nhỏ
  + hiển thị thông báo kết quả lên màn hình
  + chỉ click được nút quay khi đã chọn đủ 3 item
 ===========================================*/

// tạo mảng tên các item
const array = ["bầu", "Cá", "Cua", "Gà", "Hươu", "Tôm"];
// lấy ra các phần tử ở cược
const imgQuay = document.querySelectorAll(".images img");
const imgCuoc = document.querySelectorAll(".item img");
const btnQuay = document.getElementById("btn_quay");
// tạo mảng số lượng của các item
let arrSoLuong = Array(6).fill(0);
let count = 0;
btnQuay.disabled = true;

// tạo mảng src img
let arrSrc = [];
imgCuoc.forEach((element) => {
  arrSrc.push(element.src);
});

imgCuoc.forEach((element, index) => {
  // lắng nghe sự kiện click của từng item ở cược
  element.addEventListener("click", function () {
    // tmp laf biến tạm để cập nhật số lượng của item đã click
    let tmp = Number(element.previousElementSibling.textContent);
    if (count < 3) {
      count++;
      tmp++;
      element.previousElementSibling.textContent = tmp;
      arrSoLuong[index] = tmp;
    }
    // nút quay chi click được khi đã chọn đủ 3 item
    btnQuay.disabled = count !== 3;
  });

  // lấy ra button ở cược xóa hêt thông tin đã click
  const btnCuoc = document.getElementById("btn_cuoc");
  btnCuoc.addEventListener("click", function () {
    imgCuoc.forEach((element) => {
      element.previousElementSibling.textContent = "0";
    });
    count = 0;
    arrSoLuong = Array(6).fill(0);
  });
});

// nếu đã chọn đủ 3 item thì thực hiện sự kiện click ở quay

// lấy các item ở phần quay
const itemQuay1 = document.getElementById("item_quay_1");
const itemQuay2 = document.getElementById("item_quay_2");
const itemQuay3 = document.getElementById("item_quay_3");

btnQuay.addEventListener("click", handleQuayClick);

function handleQuayClick() {
  let randomItem1;
  let randomItem2;
  let randomItem3;
  // hàm tạo ra các số ngẫu nhiên rồi thay đổi ảnh dựa theo các số ngẫu nhiên đó
  function randomItemQuay() {
    randomItem1 = Math.floor(Math.random() * 6);
    randomItem2 = Math.floor(Math.random() * 6);
    randomItem3 = Math.floor(Math.random() * 6);
    itemQuay1.src = arrSrc[randomItem1];
    itemQuay2.src = arrSrc[randomItem2];
    itemQuay3.src = arrSrc[randomItem3];
  }

  // Thực hiện lại hàm sau 20ms
  const intervalId = setInterval(randomItemQuay, 20);

  // tạo ra mảng để lấy các item cuối cùng xuất hiện
  let arrQuay = Array(6).fill(0);

  // dừng hàm sau 2 giây thực hiện, suy ra thực hiện được 100 lần
  setTimeout(function () {
    clearInterval(intervalId);
    arrQuay[randomItem1]++;
    arrQuay[randomItem2]++;
    arrQuay[randomItem3]++;
  }, 1980);

  // hiện thị thông báo kết quả
  const ketQua = document.getElementById("ket_qua");
  const boxAlert = document.querySelector(".box_alert");

  // đề thông báo kết quả hiện thị sau 2s
  setTimeout(function () {
    // so sánh 2 mảng, trùng thì là đúng
    function arrayEqual(arr1, arr2) {
      for (let i = 0; i < 6; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    }

    // hiện thị thông báo đúng sai
    if (arrayEqual(arrSoLuong, arrQuay)) {
      document.getElementById("alert_p").innerHTML =
        "Bạn đoán đúng, kết quả của bạn là:";
    } else {
      document.getElementById("alert_p").innerHTML =
        "Bạn đoán sai, kết quả của bạn là:";
    }

    // hiển thị kết quả đã chọn
    arrSoLuong.forEach((i, ind) => {
      if (i > 0) {
        const addSpan = document.createElement("span");
        addSpan.innerHTML = `<span>${array[ind]} </span><span>${i}, </span>`;
        ketQua.appendChild(addSpan);
      }
      boxAlert.style.display = "block";
    });
  }, 2000);

  // tắt thông báo và reset lại dữ liệu
  const btnAlert = document.getElementById("btn_alert");
  btnAlert.addEventListener("click", function () {
    boxAlert.style.display = "none";
    arrQuay = Array(6).fill(0);
    arrSoLuong = Array(6).fill(0);
    imgCuoc.forEach((element) => {
      element.previousElementSibling.textContent = "0";
      count = 0;
      ketQua.innerHTML = "";
      btnQuay.disabled = true;
    });
  });
}
