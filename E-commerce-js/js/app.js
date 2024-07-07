const Loader = document.querySelector(".loader-container");
setTimeout(() => {
  Loader.style.display = "none"
}, 2000)

const cart = document.querySelector("#cart")
const searchButton = document.querySelector(".searchIcon")
var FullSc = document.querySelector("#full-sc");
let naibHeader = document.querySelector("#naibHeader");
let icon2 = document.querySelector("#icon2")
let blockKrna = document.querySelector("#block-krna")
let priceContainer = document.querySelector("#price-container")
let conMain = document.querySelectorAll(".container .card");
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  FullSc.style.top = "5px";
  naibHeader.style.opacity = "0"
  searchButton.style.opacity = "0"
  blockKrna.style.display = "none"
  priceContainer.style.display = "none"
  conMain.forEach((single) => {
    single.removeAttribute("data-aos")
  })
  console.log("clicked");
})

icon2.addEventListener("click", (event) => {
  event.preventDefault();
  FullSc.style.top = "-400px";
  naibHeader.style.opacity = "1"
  searchButton.style.opacity = "1"
  blockKrna.style.display = "block"
  priceContainer.style.display = "block"
  conMain.forEach((single) => {
    single.setAttribute("data-aos")
  })
})

let card = document.querySelectorAll(".card");
card.forEach((singleArray) => {
  singleArray.addEventListener("mouseover", (e) => {
    e.preventDefault();
    singleArray.style.boxShadow = "6px 8px 25px rgba(0, 0, 0, 0.5)"
    singleArray.style.transition = "all ease 0.5s"

  })
})

let card2 = document.querySelectorAll(".card");
card2.forEach((singleArray) => {
  singleArray.addEventListener("mouseout", (e) => {
    e.preventDefault();
    singleArray.style.boxShadow = "none"
  })
})


let conBtnItm = document.querySelectorAll(".AddItm")
let sec = document.querySelector('#sec')
let icon2Want = document.querySelector('#sec .ico2')
let divUnder = document.querySelector(".divUnder");
let divUnderBtn = document.querySelector(".divUnder");


conBtnItm.forEach((singleBtn) => {
  singleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    swal({
      title: "Added SuccesFully!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yiss!",
    })
    let mainDiv = singleBtn.closest(".card")
    let image = mainDiv.querySelector(".con-img img")
    let name = mainDiv.querySelector(".icons h3")?.innerText;
    let Price = mainDiv.querySelector(".Items2 #span")?.innerText;
    cart.style.display = "block";
    sec.style.display = "block";
    cart.style.zIndex = "99";
    cart.style.transform = "scale(1)";
    cart.style.right = "0px";
    cart.style.opacity = "1"
    sec.style.width = "100%"
    sec.style.height = "auto"

    //// InnerText Match and Alert;

    const CartItemRow = document.querySelectorAll(".cartUnder .divUnder .dinUnderDivs");
    let alreadyUnderdiv = false;

    if (CartItemRow?.length > 0) {
      CartItemRow?.forEach((singleCartRow) => {
        const dinUnderDivsName = singleCartRow.querySelector(".head-name")?.innerText;
        if (name == dinUnderDivsName) {
          alreadyUnderdiv = true;
        }
      });

      if (alreadyUnderdiv) {
        swal("Alert", "Just One Time You Click This Add Item Button")
        return;
      }
    }

    //// create Div
    const CreateDiv = document.createElement("div");
    CreateDiv.classList.add("dinUnderDivs");
    CreateDiv.innerHTML = ` 
        <img src=${image?.src} width="100"
      height="100" />
        <h2 class="head-name">${name}</h2>
        <h2 class="PriceCart">${Price}</h2>
        <input type="number" class="Quantity" value="1">
        <button class="btn-remove">Remove</button>`

    divUnder.append(CreateDiv)
    updateCartTotal()
  })


  divUnder.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("btn-remove")) {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: ["No", "Yes"],
        dangerMode: true,

      })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            }
            );
            e.target.parentElement.remove()
            updateCartTotal()
          } else {
            swal("Your imaginary file is safe!");
          }
        });
    } else {

    }
  })

})
icon2Want.addEventListener("click", (event) => {
  event.preventDefault();
  cart.style.display = "none"
  sec.style.display = "none"
  // divUnder.innerHTML = ""
})

setTimeout(() => {
  updateCartTotal();
}, 1000);


function updateCartTotal() {
  const AllVariableDiv = document.querySelectorAll(".divUnder .dinUnderDivs");
  const TotalPriceCart = document.querySelector(".underBtnWithSpan .totalPrice");
  //   console.log(AllVariableDiv, TotalPriceCart);
  let total = 0;
  if (AllVariableDiv?.length > 0) {
    AllVariableDiv.forEach(function (singleCartRow) {
      console.log(singleCartRow, "singleCartRow");
      const VariablePrice = singleCartRow.querySelector(".PriceCart")?.innerText;
      console.log(VariablePrice, "VariablePrice");
      const VariableQuantity = singleCartRow.querySelector(".Quantity");
      console.log(VariableQuantity?.value, "VariableQuantity");

      let price = new String(VariablePrice)
      let Qunatiy = new String(VariableQuantity.value)
      console.log(Qunatiy);

      if (!isNaN(price && !isNaN(Qunatiy))) {
        total += price * Qunatiy;
      }
      VariableQuantity.addEventListener("change", (e) => {
        const currentE = e.target;
        if (currentE.value <= 0) {
          currentE.value = "1";
          console.log(currentE, "currentE");
        }
        updateCartTotal();
      });

    })
    TotalPriceCart.innerText = `$ ${total.toFixed(2)}`;
  } else {
    TotalPriceCart.innerText = `$ 00`;
  }
}
const ClearBtn = document.querySelector(".Clear-btn");
console.log(ClearBtn);
ClearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  swal({
    title: "Are you sure?",
    icon: "warning",
    buttons: ["No", "Yes"],
    dangerMode: true,

  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        divUnder.innerHTML = ""
        updateCartTotal()
      } else {
        swal("Your imaginary file is safe!");
      }
    });
})

const InputField = document.querySelector(".searchtext");
InputField.addEventListener("keyup", (event) => {
  event.preventDefault();
  let targeter = event.target;
  let ValueTargeter = targeter.value;
  let card = document.querySelectorAll(".card");
  card.forEach((singleCard) => {
    if (singleCard.innerText.toLowerCase().indexOf(ValueTargeter.toLowerCase()) === -1) {
      singleCard.style.display = "none"
    } else {
      singleCard.style.display = "block"
    }
  })
})